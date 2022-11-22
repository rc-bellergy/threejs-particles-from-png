import * as THREE from 'three' 
import EventEmitter from './event_emitter.js'
import { decode } from 'fast-png'

/**
 * Handle resource loading and emitting events
 */
export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders () {
        this.loaders = {}
        this.loaders.fileLoader = new THREE.FileLoader()
        this.loaders.imageLoader = new THREE.ImageLoader()
        this.loaders.arraybufferLoader = new THREE.FileLoader()
        this.loaders.arraybufferLoader.setResponseType('arraybuffer')

    }

    startLoading () {
        // Load each source

        for (const source of this.sources) {
            switch (source.type) {

                case 'csv':
                    this.loaders.fileLoader.load(
                        source.path,
                        (data) => {
                            this.sourceLoaded(source, data)
                            console.log("Resource loaded:", source.path)
                        }
                    )
                    break;

                case 'png':
                    this.loaders.imageLoader.load(
                        source.path,
                        (data) => {
                            this.sourceLoaded(source, data)
                            console.log("Resource loaded:", source.path)
                        }
                    )
                    break;

                case 'png_16bit':
                    this.loaders.arraybufferLoader.load(
                        source.path,
                        (data) => {
                            this.sourceLoaded(source, data)
                            console.log("Resource loaded:", source.path)
                        }
                    )
                    break;


                default:
                    console.log('source.type not found', source.type)
                    break;
            }
        }
    }

    sourceLoaded (source, file) {
        this.items[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }

    promiseLoader (loader, url) {
        return new Promise((resolve, reject) => {
            loader.load(url, data => resolve(data), null, reject)
        })
    }
}