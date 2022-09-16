
const data = [
    {key: '治愈', val: 77},
    {key: '会说话', val: 72},
    {key: '勇敢', val: 50},
    {key: '善良', val: 46},
    {key: '机智', val: 80},
    {key: '美貌', val: 60}
]
export function drawRadar ($el) {
    const initWidth = $el.offsetWidth*2;
    const initHeight = $el.offsetHeight*2;
    const mData = [['速度', 77],
        ['力量', 72],
        ['防守', 46],
        ['射门', 50],
        ['传球', 80],
        ['耐力', 60]];
    const mCount = data.length; //边数
    const mCenter = initWidth/2; //中心点
    const mRadius = mCenter - 50; //半径(减去的值用于给绘制的文本留空间)
    const mAngle = Math.PI * 2 / mCount; //角度
    const mColorPolygon = '#B8B8B8'; //多边形颜色
    const mColorLines = '#B8B8B8'; //顶点连线颜色
    const mColorText = '#000000';

    //初始化
    const canvas = document.createElement('canvas');
    $el.appendChild(canvas);
    canvas.width = initWidth;
    canvas.height = initHeight;
    const mCtx = canvas.getContext('2d');

    drawPolygon(mCtx);
    // drawLines(mCtx);
    // drawText(mCtx);
    // drawRegion(mCtx);
    // drawCircle(mCtx);
    // 绘制多边形边
    function drawPolygon(ctx){
        ctx.save();
        ctx.strokeStyle = mColorPolygon;
        // const r = mRadius/ mCount; //单位半径
        // console.log('-->>', r, mRadius)
        //画6个圈
        // for(let i = 0; i < 4; i ++){
        //
        // }
        ctx.beginPath();
        const currR = 150 * ( 0 + 1); //当前半径
        //画6条边
        // ctx.moveTo(mCenter, currR * Math.cos(mAngle * 0))
        // ctx.lineTo(mCenter,  currR * Math.sin(mAngle * 0))

        for(let j = 0; j < 6; j ++){
            let x = mCenter + currR * Math.cos(mAngle * j);
            let y = mCenter + currR * Math.sin(mAngle * j);
            console.log(x, y, mAngle * j)

            ctx.lineTo(x, y);
        }
        ctx.closePath()
        ctx.stroke();
        ctx.restore();
    }

    //顶点连线
    function drawLines(ctx){
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = mColorLines;

        for(var i = 0; i < mCount; i ++){
            var x = mCenter + mRadius * Math.cos(mAngle * i);
            var y = mCenter + mRadius * Math.sin(mAngle * i);

            ctx.moveTo(mCenter, mCenter);
            ctx.lineTo(x, y);
        }

        ctx.stroke();

        ctx.restore();
    }

    //绘制文本
    function drawText(ctx){
        ctx.save();

        var fontSize = mCenter / 12;
        ctx.font = fontSize + 'px Microsoft Yahei';
        ctx.fillStyle = mColorText;

        for(var i = 0; i < mCount; i ++){
            var x = mCenter + mRadius * Math.cos(mAngle * i);
            var y = mCenter + mRadius * Math.sin(mAngle * i);

            if( mAngle * i >= 0 && mAngle * i <= Math.PI / 2 ){
                ctx.fillText(mData[i][0], x, y + fontSize);
            }else if(mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI){
                ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y + fontSize);
            }else if(mAngle * i > Math.PI && mAngle * i <= Math.PI * 3 / 2){
                ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y);
            }else{
                ctx.fillText(mData[i][0], x, y);
            }

        }

        ctx.restore();
    }

    //绘制数据区域
    function drawRegion(ctx){
        ctx.save();

        ctx.beginPath();
        for(var i = 0; i < mCount; i ++){
            var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
            var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();

        ctx.restore();
    }

    //画点
    function drawCircle(ctx){
        ctx.save();

        var r = mCenter / 18;
        for(var i = 0; i < mCount; i ++){
            var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
            var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
            ctx.fill();
        }

        ctx.restore();
    }
}