import * as THREE from 'three'
import App from "./app"

export default class Renderer {

    constructor() {
        this.app = new App()
        this.sizes = this.app.sizes
        this.scene = this.app.scene
        this.canvas = this.app.canvas
        this.camera = this.app.camera
        this.setInstance()
    }

    setInstance () {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.outputEncoding = THREE.sRGBEncoding
    }

    resize () {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update () {
        this.instance.render(this.scene, this.camera.instance)
    }
}