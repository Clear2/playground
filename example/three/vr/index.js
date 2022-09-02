import { LoadGLTF, THREERoot } from '../camera/root'
import * as THREE from 'three'
import { gsap } from 'gsap'

export function main() {
    const canvas = document.querySelector('canvas.webgl')

    const root = new THREERoot({
        alpha: 0,
        fov: 75,
        near: 0.1,
        far: 1000,
        canvas: canvas
    })

    root.camera.position.z = 50

    const names = ['4_l.jpg', '4_r.jpg', '4_u.jpg', '4_d.jpg', '4_b.jpg', '4_f.jpg']
    const cube = makeCube(new THREE.Vector3(0, 0, 0), names, k => k == '4_u.jpg' || k === '4_d.jpg')
    cube.name = 'living'
    root.scene.add(cube)

    const name1 = ['0_l.jpg', '0_r.jpg', '0_u.jpg', '0_d.jpg', '0_b.jpg', '0_f.jpg']
    const cube1 = makeCube(new THREE.Vector3(0, 0, 10), name1, k => k == '0_u.jpg' || k === '0_d.jpg')
    cube1.name = 'kitchen'
    // root.scene.add(cube1)

    const pointer = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

    const mouseDown = e => {
        e.preventDefault()
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(pointer, root.camera)
        console.log('->>', raycaster)
        const intersects = raycaster.intersectObjects(root.scene.children)
        if (intersects.length) {
            let n = intersects[0].object && intersects[0].object.name
            if (n === 'living_go') {
                console.log(intersects[0].object.name)
                gsap.to(root.controls.target, {
                    duration: 1,
                    x: cube1.position.x,
                    y: cube1.position.y,
                    z: cube1.position.z,
                    onComplete: () => {
                        gsap.to(root.camera.position, {
                            duration: 1,
                            // x: cube1.position.x+5,
                            // y: cube1.position.y+1,
                            z: cube1.position.z
                        })
                    }
                })
            }
        }
    }
    canvas.addEventListener('mousedown', mouseDown)

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
    sprite.name = 'living_go'
    root.scene.add(sprite)
    root.addUpdateCallback(() => {})
}

function makeCube(position, names, fn) {
    const boxMaterial = []
    names.map(k => {
        let texture = new THREE.TextureLoader().load(`../texture/living/${k}`)
        if (fn(k)) {
            texture.rotation = Math.PI
            texture.center = new THREE.Vector2(0.5, 0.5)
            boxMaterial.push(
                new THREE.MeshBasicMaterial({
                    map: texture
                })
            )
        } else {
            boxMaterial.push(
                new THREE.MeshBasicMaterial({
                    map: texture
                })
            )
        }
    })

    const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(20.48, 20.48, 20.48), boxMaterial)
    cube.geometry.scale(1, 1, -1)
    cube.position.set(...position)
    return cube
}
main()
