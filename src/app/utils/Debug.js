import * as dat from 'lil-gui'
import App from '../app'

export default class Debug {
    constructor() {
        this.app = new App()
        this.active = window.location.hash === '#debug'

        if (this.active) {
            this.ui = new dat.GUI()
        }
    }
}