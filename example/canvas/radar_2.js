
const data = [
    {key: '治愈', val: 77},
    {key: '会说话', val: 72},
    {key: '勇敢', val: 50},
    {key: '善良', val: 46},
    {key: '机智', val: 80},
    {key: '美貌', val: 60}
]
import { options } from './charts.js'

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

    let angleStep = -2 * Math.PI / mCount
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
    drawLines(mCtx);
    // drawText(mCtx);
    // drawRegion(mCtx);
    // drawCircle(mCtx);
    // 绘制多边形边
    function drawPolygon(ctx){
        ctx.save();
        ctx.strokeStyle = mColorPolygon
        ctx.strokeStyle="#b2b2b2";
        ctx.lineWidth = 1;
        ctx.translate(mCenter, mCenter);
        ctx.rotate(-90 * 2 * Math.PI / 360);
        for(let r = 200; r > 0 ; r -=50){
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(r,0);
            for(let i = 0; i < mCount; i++){
                ctx.rotate(angleStep);
                ctx.lineTo(r,0);
            }
            ctx.closePath();
            ctx.stroke();
            //明暗色替换填充，此处从大到小切换颜色覆盖式绘制即可
            ctx.fillStyle = '#685f54'
            ctx.fill();
            ctx.restore();
        }


    }

    //顶点连线
    function drawLines(ctx){
        //解构赋值拿到数据关键点
        let {radar:{indicator:indicators},series:[{data:data}]} = options;
        let colors = ['#c43e3a','#364c5a'];
        let length = indicators.length;
        let angleStep = -2 * Math.PI / length;

        for(let i = 0; i < data.length; i++){

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(120 * data[i].value[0] / indicators[0].max,0);

            //遍历每组数据
            for(let j = 1; j < data[i].value.length; j++){
                ctx.rotate(angleStep);
                ctx.lineTo(200 * data[i].value[j] / indicators[j].max,0);
            }
            ctx.restore();
            ctx.lineTo(200 * data[i].value[0] / indicators[0].max,0);
            ctx.strokeStyle = colors[i];
            ctx.lineWidth = 2;
            ctx.stroke();
        }
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