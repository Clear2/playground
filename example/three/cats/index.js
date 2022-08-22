import {LoadGLTF, THREERoot} from '../camera/root'
import * as THREE from "three";

export function main(){
    const root = new THREERoot({
        alpha: 0,
        fov: 45,
        far: 10000,
        canvas: document.querySelector('canvas.webgl')
    })

    root.camera.position.z = 1000

    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry( 100, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 'red', wireframe: true } )
    );
    root.scene.add( mesh )

    LoadGLTF('/modelcat/zoulu.gltf', (glft) => {
        console.log(glft)
        root.scene.add(glft.scene)
    })
    root.addUpdateCallback(() => {

    })
}
main()