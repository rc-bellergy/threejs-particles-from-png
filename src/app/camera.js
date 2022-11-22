import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import App from "./app";

export default class Camera {

    constructor() {
        this.app = new App()
        this.sizes = this.app.sizes
        this.scene = this.app.scene
        this.canvas = this.app.canvas
        this.debug = this.app.debug
        this.setInstance()
        this.setOrbitControls()
        this.setDebug()
    }

    setInstance () {
        this.instance = new THREE.PerspectiveCamera(40, this.sizes.width / this.sizes.height, 1, 500)
        this.instance.position.set(0, 0, -10)
        this.scene.add(this.instance)
    }

    setOrbitControls () {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.target.set(0, 0, 0)
        this.controls.enableDamping = true
        // this.controls.autoRotate = true
    }

    setDebug () {
        if (this.debug.active) {
            this.folder1 = this.debug.ui.addFolder('Camera Position')
            this.folder1.add(this.instance.position, 'x').listen()
            this.folder1.add(this.instance.position, 'y').listen()
            this.folder1.add(this.instance.position, 'z').listen()

            this.folder2 = this.debug.ui.addFolder('Camera Rotation')
            this.folder2.add(this.instance.rotation, 'x').listen()
            this.folder2.add(this.instance.rotation, 'y').listen()
            this.folder2.add(this.instance.rotation, 'z').listen()
        }
    }

    resize () {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update () {
        this.controls.update()
    }
}