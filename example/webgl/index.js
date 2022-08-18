const vertex = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }

`

const frag = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0)
    }
`

function main() {
    const canvas = document.querySelector(".canvas")
    const gl = canvas.getContext('webgl')
    if (!gl) {
        alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
        return;
      }

      // 使用完全不透明的黑色清除所有图像
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
      //用上面指定的颜色清除缓冲区
      gl.clear(gl.COLOR_BUFFER_BIT)

}

function initShaderProgram(gl, vs, fs){
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertex)
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, frag)

}
function loadShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader
}