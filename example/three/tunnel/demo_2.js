import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
const sizes = {
    width: 375,
    height: 724
}

let composer,
    params = {
        exposure: 1.3,
        bloomStrength: 0.9,
        bloomThreshold: 0,
        bloomRadius: 0
    }
let points = [
    [10, 89, 0],
    [50, 88, 10],
    [76, 139, 20],
    [126, 141, 12],
    [150, 112, 8],
    [157, 73, 0],
    [180, 44, 5],
    [207, 35, 10],
    [232, 36, 0]
]

export class Tunnel {
    constructor(canvas) {
        this.cameraRotationProxyX = 3.14159
        this.cameraRotationProxyY = 0
        this.cameraTargetPercentage = 0
        this.currentCameraPercentage = 0

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: 0,
            shadowMapEnabled: true,
            shadowMapType: THREE.PCFSoftShadowMap
        })
        renderer.setSize(sizes.width, sizes.height)
        this.renderer = renderer

        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x194794, 0, 100)
        this.scene = scene

        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.001, 200)
        camera.rotation.y = this.cameraRotationProxyX
        camera.rotation.z = this.cameraRotationProxyY
        this.camera = camera
        this.c = new THREE.Group()
        this.c.position.z = 400

        this.c.add(camera)
        scene.add(this.c)

        //set up render pass
        this.initRenderPass()
        this.initMaterial()

        let tubePerc = {
            percent: 0
        }
        let tl = gsap.timeline()
        tl.to(tubePerc, {
            percent: 0.96,
            duration: 10,
            onUpdate: () => {
                this.cameraTargetPercentage = tubePerc.percent
            }
        })
        this.render()
    }
    initRenderPass() {
        const renderScene = new RenderPass(this.scene, this.camera)
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), 1.5, 0.4, 0.85)
        bloomPass.renderToScreen = true
        bloomPass.threshold = params.bloomThreshold
        bloomPass.strength = params.bloomStrength
        bloomPass.radius = params.bloomRadius
        composer = new EffectComposer(this.renderer)
        composer.setSize(sizes.width, sizes.height)
        composer.addPass(renderScene)
        composer.addPass(bloomPass)
        this.composer = composer
    }
    initMaterial() {
        let p1, p2, p3
        for (let i = 0; i < points.length; i++) {
            let x = points[i][0]
            let y = points[i][2]
            let z = points[i][1]
            points[i] = new THREE.Vector3(x, y, z)
        }
        //Create a path from the points
        let path = new THREE.CatmullRomCurve3(points)
        //path.curveType = 'catmullrom';
        path.tension = 0.5

        //Create a new geometry with a different radius
        let geometry = new THREE.TubeGeometry(path, 300, 4, 32, false)

        let texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/3d_space_5.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping
            texture.offset.set(0, 0)
            texture.repeat.set(15, 2)
        })

        let mapHeight = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/waveform-bump3.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping
            texture.offset.set(0, 0)
            texture.repeat.set(15, 2)
        })

        let material = new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            map: texture,
            shininess: 20,
            bumpMap: mapHeight,
            bumpScale: -0.03,
            specular: 0xfff
        })

        //Create a mesh
        let tube = new THREE.Mesh(geometry, material)
        this.scene.add(tube)
        let geometry1 = new THREE.TubeGeometry(path, 250, 3.4, 64, false)
        let geo = new THREE.EdgesGeometry(geometry1)
        let mat = new THREE.LineBasicMaterial({
            linewidth: 2,
            opacity: 0.2,
            transparent: 1
        })
        let wireframe = new THREE.LineSegments(geo, mat)
        this.scene.add(wireframe)

        //Create a point light in our scene
        let light = new THREE.PointLight(0xffffff, 0.35, 4, 0)
        light.castShadow = true
        this.scene.add(light)
        this.updateCameraPercentage = function (percentage) {
            p1 = path.getPointAt(percentage % 1)
            p2 = path.getPointAt((percentage + 0.03) % 3)
            p3 = path.getPointAt((percentage + 0.05) % 1)
            this.c.position.set(p1.x, p1.y, p1.z)
            this.c.lookAt(p2)
            light.position.set(p2.x, p2.y, p2.z)
        }
    }
    render() {
        this.currentCameraPercentage = this.cameraTargetPercentage
        this.camera.rotation.y += (this.cameraRotationProxyX - this.camera.rotation.y) / 15
        this.camera.rotation.x += (this.cameraRotationProxyY - this.camera.rotation.x) / 15
        this.updateCameraPercentage(this.currentCameraPercentage)
        composer.render()
        requestAnimationFrame(this.render.bind(this))
    }
}
