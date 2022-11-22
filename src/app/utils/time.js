import * as THREE from 'three'
import App from "../app"
import EventEmitter from "./event_emitter";
import Stats from 'three/examples/jsm/libs/stats.module.js'

export default class Time extends EventEmitter {

    constructor(showStats = true) {

        super()
        this.app = new App()
        this.debug = this.app.debug

        // Setup
        this.clock = new THREE.Clock()
        this.elapsedTime = 0

        // Add stats UI
        if (this.debug.active) {
            this.stats = new Stats()
            this.stats.showPanel(0)
            document.body.appendChild(this.stats.dom)
        }

        // Start the frame loop
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick () {
        this.elapsedTime = this.clock.getElapsedTime()
        this.trigger('tick')

        window.requestAnimationFrame(() => {
            if (this.debug.active) {
                this.stats.begin()
            }

            this.tick()

            if (this.debug.active) {
                this.stats.end()
            }
        })
    }

}