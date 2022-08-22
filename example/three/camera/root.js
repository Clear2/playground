import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'


let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

export function THREERoot (params){
    this.updateCallbacks = []
    const {
        alpha,
        canvas,
        fov = 50,
        near = 1,
        far = 1000,
        creatControls = true
    } = params
    const scene = new THREE.Scene()
    this.scene = scene

    const renderer = new THREE.WebGLRenderer( {
        antialias: true,
        alpha: alpha,
        canvas: canvas
    })
    renderer.setPixelRatio(Math.min( window.devicePixelRatio, 2))
    renderer.setSize( window.innerWidth, window.innerHeight )
    this.renderer = renderer

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
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

export function LoadGLTF (path, callback){
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath( '/' )
    loader.setDRACOLoader( dracoLoader )
    loader.load(path,
        // called when the resource is loaded
        function ( gltf ) {
            callback && callback(gltf)
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' )
        }
    );
}