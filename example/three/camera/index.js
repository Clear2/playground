import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

function main () {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 50, aspect, 1, 10000 );
    camera.position.set(-300, 0, 2500)


    const cameraPerspective = new THREE.PerspectiveCamera( 50,  aspect, 150, 1000 );
    cameraPerspective.rotation.y = Math.PI;

    const cameraPerspectiveHelper = new THREE.CameraHelper( cameraPerspective );
    scene.add( cameraPerspectiveHelper );

    const cameraRig = new THREE.Group();
    cameraRig.add( cameraPerspective );
    scene.add( cameraRig );


    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry( 100, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 'red', wireframe: true } )
    );
    scene.add( mesh );
    const mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry( 50, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    );
    mesh2.position.y = 150;
    mesh.add( mesh2 );

    const renderer = new THREE.WebGLRenderer( {
        antialias: true,
        canvas: document.querySelector('.webgl')
    } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    renderer.autoClear = false;

    this.controls = new OrbitControls(camera, renderer.domElement)

    function render(){
        const r = Date.now() * 0.0005;

        mesh.position.x = 700 * Math.cos( r );
        mesh.position.z = 700 * Math.sin( r );
        mesh.position.y = 700 * Math.sin( r );

        mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
        mesh.children[ 0 ].position.z = 70 * Math.sin( r );

        // cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
        // cameraPerspective.far = mesh.position.length();
        // cameraPerspective.updateProjectionMatrix();
        //
        // cameraPerspectiveHelper.update();


        cameraRig.lookAt(mesh.position)
        renderer.clear();

        // renderer.setViewport( SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT );
        renderer.render( scene, camera );
    }
    function animate(){
        requestAnimationFrame( animate );

        render();
    }
    animate()
}

main()