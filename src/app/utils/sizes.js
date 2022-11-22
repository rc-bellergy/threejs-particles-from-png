import EventEmitter from "./event_emitter"

export default class Sizes extends EventEmitter {

    constructor() {
        super()

        this.updateSize()
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () => {
            this.updateSize()
        })
    }

    updateSize = () => {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.trigger('resize')
    }

}