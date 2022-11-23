import * as THREE from 'three'
import { decode } from "fast-png"



export default class DecodePNG {

    constructor(image, depth = 8) {

        if (depth == 16) {
            this.imageData = decode(image)
            this.dataWidth = 3
        } else {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            this.imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            this.dataWidth = 4
        }

        // console.log("Image Data:", this.imageData)
    }

    /**
     * 
     * @param {int} index of the particles
     * @returns {THREE.Vector4}
     * https://threejs.org/docs/#api/en/math/Vector4
     */
    getVector(index) {
        const d = this.imageData
        const i = index * this.dataWidth
        const a = this.dataWidth == 3 ? 1 : d.data[i + 3]
        return new THREE.Vector4(d.data[i], d.data[i + 1], d.data[i + 2], a)
    }

    getLength() {
        return this.imageData.data.length / this.dataWidth
    }

}
