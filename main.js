class Chair {
    constructor(points, color) {
        this.points = points;
        this.color = color;
    }
}

function main() {
    // access the canvas through DOM
    // the paper
    var canvas = document.getElementById('myCanvas');
    // the brush and the paints
    var gl = canvas.getContext('webgl');

    var points = [];

    points.push({x: -0.75, y: 0.25});       // p0
    points.push({x: -0.25, y: 0.25});       // p1
    points.push({x: -0.75, y: 0.0625});     // p2
    points.push({x: -0.6875, y: 0.0625});   // p3
    points.push({x: -0.3125, y: 0.0625});   // p4
    points.push({x: -0.25, y: 0.0625});     // p5
    points.push({x: -0.75, y: -0.25});      // p6
    points.push({x: -0.6875, y: -0.25});    // p7
    points.push({x: -0.3125, y: -0.25});    // p8
    points.push({x: -0.25, y: -0.25});      // p9

    const myChair1 = new Chair(points, {r: 0, g: 0, b: 0})

    // reset points
    points = [];

    points.push({x: 0.3125, y: 0.25});      // p10
    points.push({x: 0.6875, y: 0.25});      // p11
    points.push({x: 0.3125, y: 0.0625});    // p12
    points.push({x: 0.375, y: 0.0625});     // p13
    points.push({x: 0.625, y: 0.0625});     // p14
    points.push({x: 0.6875, y: 0.0625});    // p15
    points.push({x: 0.3125, y: -0.25});     // p16
    points.push({x: 0.375, y: -0.25});      // p17
    points.push({x: 0.625, y: -0.25});      // p18
    points.push({x: 0.6875, y: -0.25});     // p19

    const myChair2 = new Chair(points, {r: 0, g: 0, b: 0})

    var vertices = [
        // myChair1
        myChair1.points[0].x, myChair1.points[0].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[2].x, myChair1.points[2].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[5].x, myChair1.points[5].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,

        myChair1.points[0].x, myChair1.points[0].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[1].x, myChair1.points[1].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[5].x, myChair1.points[5].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,

        myChair1.points[2].x, myChair1.points[2].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[6].x, myChair1.points[6].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[7].x, myChair1.points[7].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,

        myChair1.points[2].x, myChair1.points[2].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[3].x, myChair1.points[3].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[7].x, myChair1.points[7].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,

        myChair1.points[4].x, myChair1.points[4].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[8].x, myChair1.points[8].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[9].x, myChair1.points[9].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,

        myChair1.points[4].x, myChair1.points[4].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[5].x, myChair1.points[5].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,
        myChair1.points[9].x, myChair1.points[9].y, myChair1.color.r, myChair1.color.g, myChair1.color.b,

        // myChair2
        myChair2.points[0].x, myChair2.points[0].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[2].x, myChair2.points[2].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[5].x, myChair2.points[5].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,

        myChair2.points[0].x, myChair2.points[0].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[1].x, myChair2.points[1].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[5].x, myChair2.points[5].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        
        myChair2.points[2].x, myChair2.points[2].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[6].x, myChair2.points[6].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[7].x, myChair2.points[7].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,

        myChair2.points[2].x, myChair2.points[2].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[3].x, myChair2.points[3].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[7].x, myChair2.points[7].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,

        myChair2.points[4].x, myChair2.points[4].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[8].x, myChair2.points[8].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[9].x, myChair2.points[9].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,

        myChair2.points[4].x, myChair2.points[4].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[5].x, myChair2.points[5].y, myChair2.color.r, myChair2.color.g, myChair2.color.b,
        myChair2.points[9].x, myChair2.points[9].y, myChair2.color.r, myChair2.color.g, myChair2.color.b
    ];

    // create a linked-list to store the vertices data
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // shader source code to be sent to gpu
    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            vec2 position = vec2(aPosition.x, aPosition.y);

            if(position.x >= 0.0) {
                position.y = position.y + uChange;
            }

            gl_Position = vec4(position, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    // create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // teach the computer how to collect the positional values from ARRAY_BUFFER to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    // set speed
    var speed = 0.0075;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");
    function render() {
        if(change >= 0.75 || change <= -0.75) {
            speed = -speed;
        }

        change += speed;
        gl.uniform1f(uChange, change);

        // background color
        gl.clearColor(0, 0, 0, 0.1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        var primitive = gl.TRIANGLES;
        // index of the first element
        var offset = 0;
        const TUPLE_SIZE = 5;
        // number of vertices
        var nVertex = vertices.length / TUPLE_SIZE;

        console.log(nVertex);

        gl.drawArrays(primitive, offset, nVertex);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}