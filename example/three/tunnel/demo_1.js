import * as THREE from 'three'

const sizes = {
    width: 375,
    height: 724
}

export class Tunnel {
    constructor(canvas) {
        this.normal_speed = 0.0008
        this.hyperspeed = 53
        this.hyperspeed_mode = false
        this.hyperspeed_upratio = 1.03
        this.hyperspeed_downratio = 1.3
        this.current_speed = this.normal_speed
        this.hyperspeed_upscale = 1.03
        this.hyperspeed_downscale = 1.3
        this.current_scale = 1

        const scene = new THREE.Scene()
        this.scene = scene

        const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 10000)
        camera.position.set(0, 0, 7)
        camera.lookAt(scene.position)
        scene.add(camera)
        this.camera = camera

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: 0,
            canvas: canvas
        })
        renderer.setPixelRatio(2)
        renderer.setSize(sizes.width, sizes.height)
        renderer.setViewport(0, 0, sizes.width, sizes.height)

        this.renderer = renderer

        this.initLight()

        scene.fog = new THREE.FogExp2(0x000000, 0.15)
        THREE.TextureLoader.prototype.crossOrigin = ''

        this.init()

        this.animate()
    }

    initLight() {
        const light1 = new THREE.DirectionalLight(0xff8000, 0.5)
        light1.position.set(1, 1, 0).normalize()
        this.scene.add(light1)

        const light2 = new THREE.DirectionalLight(0xff8000, 0.5)
        light2.position.set(-1, 1, 0).normalize()
        this.scene.add(light2)

        const light3 = new THREE.PointLight(0x44ffaa, 10, 25)
        light3.position.set(0, -3, 0)
        this.scene.add(light3)

        const light4 = new THREE.PointLight(0xff4400, 15, 30)
        light4.position.set(3, 3, 0)
        this.scene.add(light4)
    }

    init() {
        this.texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/water.jpg')
        this.texture.wrapT = THREE.RepeatWrapping
        this.texture.wrapS = THREE.RepeatWrapping

        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            opacity: 1,
            map: this.texture
        })
        const cylinder_geometry = new THREE.CylinderGeometry(1, 1, 30, 32, 1, true)

        this.cylinder = new THREE.Mesh(cylinder_geometry, material)
        material.side = THREE.BackSide
        this.cylinder.rotation.x = Math.PI / 2
        this.scene.add(this.cylinder)
    }

    render() {
        const { hyperspeed_mode, current_speed, hyperspeed, hyperspeed_upratio, current_scale, hyperspeed_upscale, hyperspeed_downratio, hyperspeed_downscale, normal_speed } = this
        if (hyperspeed_mode) {
            this.current_speed = current_speed >= hyperspeed ? hyperspeed : current_speed * hyperspeed_upratio
            this.current_scale = current_scale <= 0.2 ? 0.2 : current_scale / hyperspeed_upscale
        } else {
            this.current_speed = current_speed <= 1 ? 1 : current_speed / hyperspeed_downratio
            this.current_scale = current_scale >= 1 ? 1 : current_scale * hyperspeed_downscale
        }

        this.cylinder.scale.set(this.current_scale, 1, this.current_scale)
        this.texture.offset.y -= normal_speed * current_speed
        this.texture.offset.y %= 1
        this.texture.needsUpdate = true

        let seconds = Date.now() / 1000
        let angle = 0.2 * seconds
        this.camera.rotation.z = angle
        this.renderer.render(this.scene, this.camera)
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this))
        this.render()
    }
}
