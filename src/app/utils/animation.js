import anime from 'animejs/lib/anime.es.js'
import App from '../app'

export default class Animation {

    constructor() {
        this.app = new App()
        this.resource = this.app.resources
        this.camera = this.app.camera.instance

        this.resource.on('ready', () => {
            // anime({
            //     targets: this.camera.position,
            //     x: 16.3, y: 2.61, z: -1.5,
            //     duration: 8000,
            //     delay: 0,
            //     easing: 'easeInOutCubic'
            // })
            // anime({
            //     targets: this.camera.rotation,
            //     x: -0.25, y: 1.019, z: 0.2176,
            //     duration: 8000,
            //     delay: 0,
            //     easing: 'easeInOutCubic'
            // })
        })
    }


}