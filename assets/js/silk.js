document.addEventListener('loadingComplete', () => {

    const canvas = document.getElementById('silk');
        const gl = canvas.getContext('webgl');

        canvas.width = innerWidth;
        canvas.height = innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        const vertex = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
        vUv = position * .5 + .5;
        gl_Position = vec4(position, 0., 1.);
        }
        `;

        const fragment = `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;

        float noise(vec2 p){
        return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
        }

        void main(){
        vec2 uv = vUv;
        float t = uTime * .5;

        uv.y += .03 * sin(8. * uv.x - t);

        float pattern =
        .6 +
        .4 * sin(
          5. * (uv.x + uv.y + cos(3.*uv.x + 5.*uv.y) + .02*t) +
          sin(20. * (uv.x + uv.y - .1*t))
        );

        float n = noise(gl_FragCoord.xy) * .08;
        vec3 col = uColor * pattern - n;

        gl_FragColor = vec4(col, 1.);
        }
        `;

        function compile(type, src) {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        }

        const program = gl.createProgram();
        gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1,-1, 1,-1, -1,1, 1,1]),
            gl.STATIC_DRAW
        );

        const pos = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const timeLoc = gl.getUniformLocation(program, 'uTime');
        const colorLoc = gl.getUniformLocation(program, 'uColor');
        gl.uniform3f(colorLoc, 0.48, 0.45, 0.51);

        let t = 0;
        function animate() {
            t += .016;
            gl.uniform1f(timeLoc, t);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(animate);
        }
        animate();
});
