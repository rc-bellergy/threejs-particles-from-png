import * as THREE from 'three'
import App from "../app"
import DecodePNG from '../utils/decode_png'
import vertexShader from '../../shaders/point-cloud/vertex.glsl'
import fragmentShader from '../../shaders/point-cloud/fragment.glsl'

export default class Particles {

    constructor(positionsImg, colorsImg) {
        this.app = new App()
        this.scene = this.app.scene
        this.sizes = this.app.sizes
        this.time = this.app.time
        this.debug = this.app.debug

        this.settings = {
            particlesSize: 60,
            fogNear: 0,
            fogFar: 40
        }

        this.shaderMaterial = new THREE.ShaderMaterial({
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms:
            {
                uSize: { value: this.settings.particlesSize * this.sizes.pixelRatio },
                uTime: { value: 0 },

                uFogNear: { value: this.settings.fogNear },
                uFogFar: { value: this.settings.fogFar }
            },
        })

        // console.log(positionsImg, colorsImg)        
        const positionsData = new DecodePNG(positionsImg, 16)
        const colorsData = new DecodePNG(colorsImg)

        console.log("Position Data:", positionsData)
        console.log("Color Data:", colorsData)

        const particles = this.getParticles(positionsData, colorsData)
        this.object = this.createParticlesObject(particles, this.shaderMaterial)
        this.object.rotation.x = Math.PI
        this.object.rotation.y = Math.PI
        this.object.scale.x = -1
        this.scene.add(this.object)

        // Debug
        this.setDebug()

        // Frame update event
        this.time.on('tick', () => {
            this.update()
        })
    }

    setDebug() {
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Particles')
            this.debugFolder
                .add(this.settings, 'particlesSize').name('Particles Size')
                .min(1).max(100).step(1)
                .onChange(() => {
                    this.shaderMaterial.uniforms.uSize.value = this.settings.particlesSize * this.sizes.pixelRatio
                })
            this.debugFolder
                .add(this.settings, 'fogNear').name('Fog Near')
                .min(-50).max(50).step(1)
                .onChange(() => {
                    this.shaderMaterial.uniforms.uFogNear.value = this.settings.fogNear
                })
            this.debugFolder
                .add(this.settings, 'fogFar').name('Fog Far')
                .min(0).max(100).step(1)
                .onChange(() => {
                    this.shaderMaterial.uniforms.uFogFar.value = this.settings.fogFar
                })
        }
    }

    update() {
        this.shaderMaterial.uniforms.uTime.value = this.time.elapsedTime
        // this.object.rotation.y += 0.001
    }

    createParticlesObject(particles, shaderMaterial) {
        const bufferGeometry = new THREE.BufferGeometry()
        bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particles.points, 3))
        bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particles.colors, 3))
        bufferGeometry.setAttribute('aStartPosition', new THREE.Float32BufferAttribute(particles.startPoints, 3))
        bufferGeometry.setAttribute('aScale', new THREE.Float32BufferAttribute(particles.scales, 1))
        bufferGeometry.setAttribute('aDuration', new THREE.Float32BufferAttribute(particles.durations, 1))
        bufferGeometry.setAttribute('aJump', new THREE.Float32BufferAttribute(particles.jumps, 1))
        return new THREE.Points(bufferGeometry, shaderMaterial)
    }

    /**
     * 
     * @param {ImageData} positionsData The data of particles position
     * @param {ImageData} colorsData The data of particles color
     * [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
     * @returns {particles}
     */
    getParticles(positionsData, colorsData) {

        const startPoints = [] // random start points
        const points = [] // points destination
        const colors = []
        const pscale = [] // particle scale
        const durations = [] // durations move pront from start to destination
        const jumps = [] // a movement of the point in the destinationwsada

        // Get the distortion scale from the last pixel of colorData
        let ds = colorsData.getVector(colorsData.getLength() - 1)
        ds = ds.divideScalar(255) // normalize
        const scale = [ds.x, ds.y, ds.z]

        console.log("Correct distortion:", scale)

        for (let i = 0; i < positionsData.getLength() - 1; i++) {

            // Set start position (random points in the sphere)
            const randomPoint = this.getSpherePoint(0.5);
            startPoints.push(randomPoint.x, randomPoint.y, randomPoint.z)

            // Set final positions
            let p = positionsData.getVector(i);
            p = p.divideScalar(65535) // normalize (0-1)
            p = p.sub(new THREE.Vector4( 0.5, 1, 0.5, 0 )) // center
            p = p.multiply(new THREE.Vector4( scale[0], scale[1], scale[2], 0 )) // correct distortion 
            points.push(p.x, p.y, p.z)

            // Random duration and jumping noise
            let d = Math.random() + 2; // 2.x sec.
            let j = Math.random() * 0.03;
            // 5% particles will move more slowly and far than others
            if (Math.random() > 0.8) {
                d = d * 2;
                j = j * 10;
            }
            durations.push(d);
            jumps.push(0);

            // Set colors
            let c = colorsData.getVector(i)
            c = c.divideScalar(255)
            colors.push(c.x, c.y, c.z)

            // Set Size
            pscale.push(3)

        }

        const particles = {
            points: points,
            colors: colors,
            scales: pscale,
            startPoints: startPoints,
            durations: durations,
            jumps: jumps
        }

        // console.log("particles:", particles)

        return particles
    }

    // Random points in sphere
    getSpherePoint(scale) {
        let x = Math.random() - 0.5;
        let y = Math.random() - 0.5;
        let z = Math.random() - 0.5;

        let mag = Math.sqrt(x * x + y * y + z * z);
        x /= mag; y /= mag; z /= mag;

        let d = Math.random() * scale;
        return { x: x * d, y: y * d, z: z * d };
    }

}
