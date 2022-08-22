import {LoadGLTF, THREERoot} from '../camera/root'
import * as THREE from 'three'
import scene from "three/examples/jsm/offscreen/scene";

export function main(){
    const canvas = document.querySelector('canvas.webgl')

    const root = new THREERoot({
        alpha: 0,
        fov: 75,
        near: 0.1,
        far: 1000,
        canvas: canvas
    })

    root.camera.position.z = 0.1


    const names = ['4_l.jpg', '4_r.jpg','4_u.jpg','4_d.jpg','4_b.jpg','4_f.jpg']
    const boxMaterial = []
    names.map(k => {
        let texture = new THREE.TextureLoader().load(`../texture/living/${k}`)

        if (k =='4_u.jpg' || k === '4_d.jpg') {
            texture.rotation = Math.PI
            texture.center = new THREE.Vector2(0.5, .5)
            boxMaterial.push(new THREE.MeshBasicMaterial({
                map: texture
            }))
        } else {
            boxMaterial.push(new THREE.MeshBasicMaterial({
                map: texture
            }))
        }

    })

    const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry( 10, 10, 10),
        boxMaterial
    )
    cube.geometry.scale(1, 1, -1)
    root.scene.add(cube)


    const pointer = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

    const mouseDown = (e) => {
        e.preventDefault()

        pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera(pointer, root.camera)
        console.log('->>', raycaster)
        // x: 5
        // y: 1.0432259645076987
        // z: -3.0219615677640026
        const intersects = raycaster.intersectObjects( root.scene.children );
        if (intersects.length) {
            console.log(intersects)
        }
    }
    canvas.addEventListener('mousedown', mouseDown)
    // const geometry = new THREE.

    const spriteMap = new THREE.TextureLoader().load('../texture/living/go.png')
    const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending
    })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.position.set(4.5, 1, -3)
    sprite.scale.set(0.5, 0.5, 0.5)
    root.scene.add(sprite)
    root.addUpdateCallback(() => {

    })
}
main()