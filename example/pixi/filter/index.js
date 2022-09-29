// 创建云层的滤镜
export function createCloudFilter (url, stage) {
    const manifest = [
        {name: 'cloud', url: url},
        {name: 'map', url: getAssets('displacement_map.png')}
    ]
    const app = new Filter({manifest, stage}, () => {

        ShockwaveFilters.call(app)
    })
//  filter
}
function ShockwaveFilters() {
    const app = this
    this.addFilter('ShockwaveFilter', {
        args: [[app.initWidth / 2, app.initHeight / 2]],
        create() {
            const filter = this
            const maxTime = 2.5
            app.events.on('animate', function () {
                filter.time += app.ticker.elapsedMS / 1000
                filter.time %= maxTime
            })
        }
    })
}
