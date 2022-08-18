import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

export function THREERoot (params){
    this.updateCallbacks = []
    const {
        alpha,
        canvas,
        near,
        far,
        creatControls = true
    } = params
    const scene = new THREE.Scene();
    this.scene = scene

    const renderer = new THREE.WebGLRenderer( {
        antialias: true,
        alpha: alpha,
        canvas: canvas
    })
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer = renderer

    const camera = new THREE.PerspectiveCamera(  50, 0.5 * aspect, 150, 1000  );
    this.camera = camera



    const dirLight1 = new THREE.DirectionalLight( 0xffffff );
    dirLight1.position.set( 1, 1, 1 );
    scene.add( dirLight1 );
    this.tick = this.tick.bind(this)
    this.tick()


    this.createOrbitControls()
    return this

}

THREERoot.prototype = {
    createOrbitControls: function () {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.addUpdateCallback(this.controls.update.bind(this.controls))
    },
    update: function () {
        this.updateCallbacks.forEach(callback => callback())
    },
    addUpdateCallback: function(callback) {
        this.updateCallbacks.push(callback);
    },
    tick: function () {
        this.update()
        this.render()
        requestAnimationFrame(this.tick);
   },
    render: function () {
        this.renderer.render( this.scene, this.camera )
    }

}