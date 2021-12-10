import {Cuboid} from "./cuboid.js";
import {PianoChair, PianoChairRotated} from "./piano-chair.js";

window.onload = main();

function addObject(vertices, indices, object) {
    object.vertexStartIndex = vertices.length;
    vertices.push(
        ...object.vertices
    );
    object.vertexEndIndex = vertices.length - 1;
    console.log("Object vertex index: " + object.vertexStartIndex + "  " + object.vertexEndIndex);

    let offset;
    if(indices.length == 0) {
        offset = 0;
    } else {
        offset = Math.max(...indices) + 1;
    }
    console.log("Object index offset: " + offset);

    let newIndices = [...object.indices];
    for(let i = 0; i < indices.length; i++) {
        newIndices[i] += offset;
    }
    indices.push(
        ...newIndices
    );
}

function main() {
    // Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    var vertices = [];
    var indices = [];

    // Create objects
    let lightCube = new Cuboid(
        {x: 0.0, y: 0.0, z: 0.1},
        {length: 0.1, height: 0.1, width: 0.1},
        {r: 255, g: 255, b: 255},
        {shininess: 1}
    );
    let leftPianoChair = new PianoChair(
        {x: 1.0, y: 0.0, z: 0.0},
        {shininess: 150}
    )
    let rightPianoChair = new PianoChairRotated(
        {x: -0.75, y: 0.0, z: 0.0},
        {shininess: 8}
    )
    
    // Add objects
    addObject(vertices, indices, lightCube);
    addObject(vertices, indices, leftPianoChair);
    addObject(vertices, indices, rightPianoChair);

    // Create a linked-list for storing the vertices data
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create a linked-list for storing the indices data
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute vec3 aNormal;
        attribute float aShininessConstant;

        varying float vShininessConstant;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying vec3 vNormal;

        uniform mat4 uModel;
        uniform mat4 uView;
        uniform mat4 uProjection;

        void main() {
            vec4 originalPosition = vec4(aPosition, 1.);
            gl_Position = uProjection * uView * uModel * originalPosition;
            vPosition = (uModel * originalPosition).xyz;
            vColor = aColor;
            vNormal = aNormal;
            vShininessConstant = aShininessConstant;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vPosition;
        varying float vShininessConstant;
        varying vec3 vColor;
        varying vec3 vNormal;

        uniform vec3 uAmbientConstant;   // Represents the light color
        uniform float uAmbientIntensity;
        uniform vec3 uDiffuseConstant;  // Represents the light color
        uniform vec3 uLightPosition;
        uniform mat3 uNormalModel;
        uniform vec3 uSpecularConstant; // Represents the light color
        uniform vec3 uViewerPosition;
        
        void main() {
            
            // Calculate the ambient component
            vec3 ambient = uAmbientConstant * uAmbientIntensity;
            
            // Prepare the diffuse components
            vec3 normalizedNormal = normalize(uNormalModel * vNormal);
            vec3 vLight = uLightPosition - vPosition;
            vec3 normalizedLight = normalize(vLight);
            vec3 diffuse = vec3(0., 0., 0.);
            float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

            // Prepare the specular components
            vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
            vec3 vViewer = uViewerPosition - vPosition;
            vec3 normalizedViewer = normalize(vViewer);
            vec3 normalizedReflector = normalize(vReflector);
            vec3 specular = vec3(0., 0., 0.);
            float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
            
            // Calculate the phong reflection effect
            if (cosTheta > 0.) {
                diffuse = uDiffuseConstant * cosTheta;
            }
            if (cosPhi > 0.) {
                specular = uSpecularConstant * pow(cosPhi, vShininessConstant);
            }
            vec3 phong = ambient + diffuse + specular;

            // Apply the shading
            gl_FragColor = vec4(phong * vColor, 1.);
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    // the positional values from ARRAY_BUFFER
    // to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        3, 
        gl.FLOAT, 
        false, 
        10 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false, 
        10 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);
    var aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
    gl.vertexAttribPointer(
        aNormal,
        3,
        gl.FLOAT,
        false, 
        10 * Float32Array.BYTES_PER_ELEMENT,
        6 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aNormal);
    var aShininessConstant = gl.getAttribLocation(shaderProgram, "aShininessConstant");
    gl.vertexAttribPointer(
        aShininessConstant,
        1,
        gl.FLOAT,
        false,
        10 * Float32Array.BYTES_PER_ELEMENT,
        9 * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(aShininessConstant);

    var lightPosition = [0.0, 0.0, 0.0];

    // Lighting and Shading
    
    // AMBIENT
    var uAmbientConstant = gl.getUniformLocation(shaderProgram, "uAmbientConstant");
    var uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
    gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);       // white light
    gl.uniform1f(uAmbientIntensity, 0.275);

    // DIFFUSE
    var uDiffuseConstant = gl.getUniformLocation(shaderProgram, "uDiffuseConstant");
    var uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
    var uNormalModel = gl.getUniformLocation(shaderProgram, "uNormalModel");
    gl.uniform3fv(uDiffuseConstant, [1.0, 1.0, 1.0]);   // white light
    gl.uniform3fv(uLightPosition, lightPosition);    // light position

    // Perspective projection
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    var perspectiveMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(perspectiveMatrix, Math.PI/3, 1.0, 0.5, 10.0);
    gl.uniformMatrix4fv(uProjection, false, perspectiveMatrix);

    // Interactive graphics with keyboard
    var camera = [0.0, 0.0, 3.0];
    var cameraLookAt = [0.0, 0.0, 0.0];
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(
        viewMatrix,
        camera,                 // the location of the eye or the camera
        cameraLookAt,          // the point where the camera look at
        [0.0, 1.0, 0.0]
    );

    gl.uniformMatrix4fv(uView, false, viewMatrix);
    
    function onKeydown(event) {
        // A
        if (event.keyCode == 65) {
            camera[0] -= 0.1;
            cameraLookAt[0] -= 0.1;
            glMatrix.mat4.lookAt(
                viewMatrix,
                camera,
                cameraLookAt,
                [0.0, 1.0, 0.0]
            );
        }
        // W
        else if (event.keyCode == 87) {
            for(let i = lightCube.vertexStartIndex; i <= lightCube.vertexEndIndex; i += 10) {
                vertices[i + 1] += 0.1;
            }
            lightPosition[1] += 0.1;
        }
        // D
        else if (event.keyCode == 68) {
            camera[0] += 0.1;
            cameraLookAt[0] += 0.1;
            glMatrix.mat4.lookAt(
                viewMatrix,
                camera,
                cameraLookAt,
                [0.0, 1.0, 0.0]
            );
        }
        // S
        else if (event.keyCode == 83) {
            for(let i = lightCube.vertexStartIndex; i <= lightCube.vertexEndIndex; i += 10) {
                vertices[i + 1] -= 0.1;
            }
            lightPosition[1] -= 0.1;
        }
        gl.uniformMatrix4fv(uView, false, viewMatrix);
    }
    document.addEventListener("keydown", onKeydown);
    
    // SPECULAR
    var uSpecularConstant = gl.getUniformLocation(shaderProgram, "uSpecularConstant");
    var uViewerPosition = gl.getUniformLocation(shaderProgram, "uViewerPosition");
    gl.uniform3fv(uSpecularConstant, [1.0, 1.0, 1.0]);  // white light
    gl.uniform3fv(uViewerPosition, camera);

    var uModel = gl.getUniformLocation(shaderProgram, "uModel");

    function render() {
        // Update vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Update light position
        gl.uniform3fv(uLightPosition, lightPosition);

        var modelMatrix = glMatrix.mat4.create();
        gl.uniformMatrix4fv(uModel, false, modelMatrix);
        var normalModelMatrix = glMatrix.mat3.create();
        glMatrix.mat3.normalFromMat4(normalModelMatrix, modelMatrix);
        gl.uniformMatrix3fv(uNormalModel, false, normalModelMatrix);

        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}