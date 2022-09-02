const vertex = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    attribute vec4 a_Position;
    void main() {
        // gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        //   gl_Position = vec4(0.0,0.0,0.0, 1.0);
          gl_Position = a_Position;
          gl_PointSize = 10.0;
    }

`

const frag = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`

function main () {
    const canvas = document.querySelector('.canvas')
    canvas.width = 600
    canvas.heigth = 600
    const gl = canvas.getContext('webgl')
    if (!gl) {
        alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
        return;
    }

    // 使用完全不透明的黑色清除所有图像
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    //用上面指定的颜色清除缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT)

    const shaderProgram = initShaderProgram(gl, vertex, frag)
    console.log(shaderProgram, gl.POINTS)
    // 获取attribute变量的存储位置
    const a_position = gl.getAttribLocation(shaderProgram, 'a_Position')

    // 将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_position, 1,0.0,0.0)
    // gl.clearColor(0.0,0.0, 0.0,1.0)
    // gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)

    const g_points = []
    canvas.addEventListener('mousedown', evt => click(evt, gl, canvas, a_position))

    function click (ev, gl, canvas, a_Position) {
        const rect = ev.target.getBoundingClientRect()

        let x = (ev.clientX/rect.width)*2-1
        let y = (ev.clientY/rect.height)*2-1
        g_points.push(x)
        g_points.push(-y)
        gl.clear(gl.COLOR_BUFFER_BIT)
        console.log(x,y, ev.clientY, rect.height)
        for (let i = 0; i<g_points.length; i+=2) {
            gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0)
            gl.drawArrays(gl.POINTS, 0, 1)
        }
    }
}