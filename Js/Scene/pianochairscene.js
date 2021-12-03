import {Vector3} from "../Geometry/vector3.js";
import {Scene} from "./scene.js";
import {PianoChair} from "../GeometryObject/pianochair.js";
import {CubeLightSource} from "../Geometry/cubelightsource.js";
import {Color} from "../Geometry/color.js";

export class PianoChairScene extends Scene {
    movementSpeed = 0.05;

    constructor(canvas) {
        super(canvas);
        this._initGeometries();
        this.moveLightSourceUp = false;
        this.moveLightSourceDown = false;
        this.moveCameraLeft = false;
        this.moveCameraRight = false;
        this.rotateWorld = false;
    }

    _initGeometries() {
        this.lightsource_cube =
            new CubeLightSource(
                new Vector3(0.0, 0.0, 0.0),
                0.25,
                new Color(1, 1, 1, 1.0),
                1,
            );
        this.addGeometry(this.lightsource_cube);

        let rightPianoChair = new PianoChair(
            new Vector3(0.75, 0.0, 0.0),
            150.0,
            new Vector3(0.0, 0.0, 0.0),
        );
        this.addGeometry(rightPianoChair);

        let leftPianoChair = new PianoChair(
            new Vector3(-0.5, 0.0, 0.0),
            8.0,
            new Vector3(0.0, 90.0, 0.0),
        );
        this.addGeometry(leftPianoChair);
    }

    _onKeyDown(event) {
        //W
        if (event.keyCode === 87) {
            this.moveLightSourceUp = true
        }
        //S
        if (event.keyCode === 83) {
            this.moveLightSourceDown = true
        }
        //A
        if (event.keyCode === 65) {
            this.moveCameraLeft = true
        }
        //D
        if (event.keyCode === 68) {
            this.moveCameraRight = true
        }
        //O
        if (event.keyCode === 79) {
            this.rotateWorld = !this.rotateWorld;
        }
    }

    animate() {
        let startTime = new Date();
        this._update();
        this._render();
        let endTime = new Date();
    }

    _update() {
        let vertexChanged = false;
        let viewChanged = false;

        if (this.moveLightSourceUp) {
            this.lightsource_cube.translate(new Vector3(0, this.movementSpeed, 0));
            this.lightSourcePosition[1] += this.movementSpeed
            this.moveLightSourceUp = false
            vertexChanged = true;
        }
        if (this.moveLightSourceDown) {
            this.lightsource_cube.translate(new Vector3(0, -this.movementSpeed, 0));
            this.lightSourcePosition[1] -= this.movementSpeed
            this.moveLightSourceDown = false
            vertexChanged = true;
        }
        if (this.moveCameraLeft) {
            this.camera[0] -= 0.01
            this.lookAt[0] -= 0.01
            this.moveCameraLeft = false
            viewChanged = true;
        }
        if (this.moveCameraRight) {
            this.camera[0] += 0.01
            this.lookAt[0] += 0.01
            this.moveCameraRight = false
            viewChanged = true;
        }

        if (vertexChanged) {
            this._initVerticesBuffer();
            this._initNormalsBuffer();
            this._bindVertexBuffer();
            this._bindNormalBuffer();
        }

        if (viewChanged) {
            this._initViewMatrix();
        }

        if (this.rotateWorld) {
            this.webGlUtils.rotateZ(this.rotationMatrix, 0.002);
            this.webGlUtils.rotateY(this.rotationMatrix, 0.002);
            this.webGlUtils.rotateX(this.rotationMatrix, 0.002);
        }
        this._bindUniforms();
    }
}
