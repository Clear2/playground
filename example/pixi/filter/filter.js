import { Application, settings, Container, Rectangle, Sprite, Text, TilingSprite, WRAP_MODES, utils, filters as externalFilters, Graphics } from 'pixi.js'

import { ZoomBlurFilter } from '@pixi/filter-zoom-blur'
import { DisplacementFilter } from '@pixi/filter-displacement'
import { ShockwaveFilter } from '@pixi/filter-shockwave'
import {GlitchFilter} from '@pixi/filter-glitch';



const filters = {
    DisplacementFilter: DisplacementFilter,
    ZoomBlurFilter: ZoomBlurFilter,
    ShockwaveFilter: ShockwaveFilter,
    GlitchFilter: GlitchFilter
}

const { EventEmitter } = utils


export class Filter extends Application {
    constructor({ manifest, stage }, cb, id) {
        const initWidth = stage.offsetWidth*2 //domElement.offsetWidth
        const initHeight = stage.offsetHeight*2 //domElement.offsetHeight
        super({
            view: stage,
            width: initWidth,
            height: initHeight,
            autoStart: false,
            backgroundAlpha: 0
        })
        this.id = id
        settings.PRECISION_FRAGMENT = 'highp'
        this.initWidth = initWidth
        this.initHeight = initHeight
        this.animateTimer = 0
        this.pondFilters = []
        this.events = new EventEmitter()

        this.load(manifest, () => {
            cb && cb()
        })
    }
    get resources() {
        return this.loader.resources
    }
    load(manifest, callback) {
        this.loader.add(manifest).load(() => {
            this.init()
            this.start()
            callback()
        })
    }
    init() {
        const { resources } = this.loader
        this.pond = new Container()
        this.stage.addChild(this.pond)

        this.cloud = new Sprite(resources['cloud'].texture)
        this.cloud.filters = this.pondFilters

        this.pond.addChild(this.cloud)

        window.addEventListener('resize', this.handleResize.bind(this))
        this.handleResize()

        this.ticker.add(this.animate, this)
    }
    handleResize() {
        this.renderer.resize(this.initWidth, this.initHeight)
        this.render()
    }
    animate(delta) {
        this.animateTimer += delta * 0.05
        this.events.emit('animate', delta, this.animateTimer)
    }
    addFilter(id, options) {
        let filter
        const ClassRef = filters[id]
        if (!ClassRef) {
            throw new Error(`Unable to find class name with "${id}"`)
        }
        if (options.args) {
            const ClassRefArgs = function (a) {
                ClassRef.apply(this, a)
            }
            ClassRefArgs.prototype = ClassRef.prototype
            filter = new ClassRefArgs(options.args)
        }


        if (options.create) {
            console.log(filter)
            options.create.call(filter)
        }
        this.pondFilters.push(filter)
        this.render()
        return filter
    }
}

function DisplacementFilters() {
    const app = this
    this.resources.map.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT
    const displacementSprite = new Sprite(this.resources.map.texture)
    this.addFilter('DisplacementFilter', {
        name: '',
        args: [displacementSprite, this.initWidth, this.initHeight],
        create() {
            this.scale.x = 50
            this.scale.y = 50
        }
    })
}

function ZoomBlurFilters() {
    this.addFilter('ZoomBlurFilter', {
        name: 'zoom',
        args: [
            {
                enabled: true,
                strength: 0.5,
                center: [this.initWidth / 2, this.initHeight / 2],
                innerRadius: 80
            }
        ]
    })
}

