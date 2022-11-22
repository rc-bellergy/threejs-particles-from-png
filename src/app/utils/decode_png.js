import * as THREE from 'three'

export default class DecodePNG {
    constructor(image) {

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        this.imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        // console.log("Image Data:", this.imageData)
    }

    getVector(index) {
        const d = this.imageData
        const i = index * 4
        return new THREE.Vector4(d.data[i], d.data[i + 1], d.data[2], d.data[3])
    }

    getPosition(index) {
        const d = this.imageData
        const i = index * 4
        const p = {
            x: d.data[i],
            y: d.data[i + 1],
            z: d.data[i + 2],
            w: d.data[i + 3]
        }
        return p;
    }

    getColor(index) {
        const d = this.imageData
        const i = index * 4
        const c = {
            r: d.data[i],
            g: d.data[i + 1],
            b: d.data[i + 2],
            a: d.data[i + 3]
        }
        return c;
    }

    getLength() {
        return this.imageData.data.length / 4
    }

    _getPosition(x, y) {
        const d = this.imageData
        const index = (y * d.width + x) * 4;
        const p = {
            x: d.data[index],
            y: d.data[index + 1],
            z: d.data[index + 2],
            w: d.data[index + 3]
        }
        return p;
    }
}
