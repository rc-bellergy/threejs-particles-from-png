import * as THREE from 'three'
import Sizes from "./utils/sizes"
import Time from "./utils/time"
import Resources from './utils/resources'
import Animation from './utils/animation'
import Camera from "./camera"
import Renderer from './renderer'
import World from './world/world'

import sources from './sources.js'
import Debug from './utils/Debug'

// For singleton class
let instance = null

export default class App {

    /**
     * The root class of the ThreeJS project
     * 
     * @param {*} canvas document node of canvas
     */
    constructor(canvas) {

        // Handle singleton class
        if (instance) {
            return instance
        }
        instance = this

        // Setup
        this.debug = new Debug()
        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x14213d)
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.animation = new Animation()
        this.renderer = new Renderer()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })
        // Frame update event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize = () => {
        this.camera.resize()
        this.renderer.resize()
    }

    update = () => {
        this.camera.update()
        this.renderer.update()
    }
}