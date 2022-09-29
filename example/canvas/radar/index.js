function main () {
    const canvas = document.querySelector('.canvas')
    canvas.width = 300
    canvas.height = 300

    let centerX = canvas.width/2
    let centerY = canvas.height/2

    const ctx = canvas.getContext('2d')

    ctx.strokeRect(0, 0, 300, 300);


    ctx.fillStyle = 'red'
    ctx.translate(centerX, centerY)
    // ctx.rotate(-90 * 1 * Math.PI / 360)
    ctx.fillRect(0, 0, 100, 50)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 10)
    ctx.stroke()
    ctx.restore()

    let angleStep = -2 * Math.PI / 6
    // drawPolygon(ctx)
    function drawPolygon(ctx) {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = '#fff'
        ctx.translate(150, 150)
        ctx.rotate(-90 * 2 * Math.PI / 360);
        for (let r = 25*4; r > 0; r-=25) {
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(r,0)
            for(let i = 0; i < 6; i++){
                ctx.rotate(angleStep);
                ctx.lineTo(r,0);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = '#145824'
            ctx.fill();
            ctx.restore()
        }
    }

    let _cx = 0
    // window.addEventListener('touchstart', function(e) {
    //     _cx = e.touches[0].clientX
    // })
    // window.addEventListener('touchmove', (e) => {
    //     const cx = e.touches[0].clientX;
    //     const dx = cx - _cx
    //     _cx = cx
    //     console.log('--->>', dx*10)
    // })
    var phyTouch = new PhyTouch({
        touch:document.body,//反馈触摸的dom
        // vertical: true,//不必需，默认是true代表监听竖直方向touch
        // target: { y: 0 }, //运动的对象
        property: "y",  //被运动的属性
        min: 80, //不必需,运动属性的最小值
        max: 90, //不必需,滚动属性的最大值
        // sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
        // factor: 1,//不必需,表示触摸位移运动位移与被运动属性映射关系，默认值是1
        // moveFactor: 1,//不必需,表示touchmove位移与被运动属性映射关系，默认值是1
        // step: 45,//用于校正到step的整数倍
        // bindSelf: false,
        maxSpeed: 2, //不必需，触摸反馈的最大速度限制
        value: 90,
        change:function(value){
            console.log(value)
            // target.style.transform = "translate(0," + value + "px)"
            // target.style.webkitTransform = "translate(0," + value + "px)"
        }
    })
}