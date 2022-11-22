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

            // Setup
            // this.particles = new Particles(this.resources.items['line-positions'], this.resources.items['line-colors'])
            // this.particles = new Particles(this.resources.items['box-positions'], this.resources.items['box-colors'])
            this.particles = new Particles(this.resources.items['chinese-kitchen-p16'], this.resources.items['chinese-kitchen-c'])

            // debug
            const axesHelper = new THREE.AxesHelper( 0.1 );
            this.scene.add( axesHelper );
        })
    }
}