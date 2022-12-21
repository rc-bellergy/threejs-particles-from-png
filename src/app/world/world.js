import * as THREE from "three"
import App from "../app"
import Particles from "./particles"

export default class Wrold {
    constructor() {
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources

        this.resources.on('ready', () => {

            // Show the canvas
            this.app.canvas.style.setProperty('display', 'block')

            // Choose testing objects
            let showObject = 2;
            switch (showObject) {
                case 0:
                    this.particles = new Particles(this.resources.items['line-p'], this.resources.items['line-c'])
                    this.particles.object.scale.multiplyScalar(3)
                    break;
                
                case 1:
                    this.particles = new Particles(this.resources.items['box-p'], this.resources.items['box-c'])
                    this.particles.object.scale.multiplyScalar(4)
                    break;
                
                case 2:
                    this.particles = new Particles(this.resources.items['box-scatter-p'], this.resources.items['box-scatter-c'])
                    this.particles.object.scale.multiplyScalar(4)
                    break;

                case 3:
                    this.particles = new Particles(this.resources.items['chinese-kitchen-p'], this.resources.items['chinese-kitchen-c'])
                    this.particles.object.scale.multiplyScalar(10)
                    break;

                case 4:
                    this.particles = new Particles(this.resources.items['city-p'], this.resources.items['city-c'])
                    this.particles.object.scale.multiplyScalar(10)
                    break;
            
                default:
                    break;
            }

            // console.log(this.particles)

            // debug
            const axesHelper = new THREE.AxesHelper( 0.1 );
            this.scene.add( axesHelper );
        })
    }
}