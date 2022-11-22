import './style.css'
import App from './app/app.js'
// import { decode } from 'fast-png'


const canvas = document.getElementById('webgl')
const app = window.app = new App(canvas)

// var arrayBuffer = await((await fetch('/models/chinese-kitchen/p_16bit.png')).arrayBuffer())
// var depthData = (await decode(arrayBuffer)).data
// console.log(depthData)