import * as THREE from 'three'
import { THREERoot } from './root'


export function main () {
    let cameraRig = new THREE.Group()

    const root = new THREERoot({
        canvas: document.querySelector('canvas.webgl'),
        alpha: true,
        near: 1,
        far: 1000
    })
    root.camera.position.z = 500;

    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry( 100, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
    );
    root.scene.add( mesh );

    const mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry( 50, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    );
    mesh2.position.y = 150;
    mesh.add( mesh2 );




    let cameraPerspectiveHelper = new THREE.CameraHelper( root.camera )
    root.scene.add(cameraPerspectiveHelper)


    cameraRig.add(root.camera)
    root.scene.add( cameraRig )


    root.addUpdateCallback(() => {
        const r = Date.now() * 0.0005;

        mesh.position.x = 100 * Math.cos( r );
        mesh.position.z = 100 * Math.sin( r );
        mesh.position.y = 100 * Math.sin( r );

        mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
        mesh.children[ 0 ].position.z = 70 * Math.sin( r );

        cameraPerspectiveHelper.update()
        cameraRig.lookAt( mesh.position );
        root.renderer.clear()


        console.log('update')
    })
}

main()