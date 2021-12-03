import {GeometryObject} from "./geometryobject.js";
import {Vector3} from "../Geometry/vector3.js";
import {Color} from "../Geometry/color.js";
import {Cuboid} from "../Geometry/cuboid.js";

export class PianoChair extends GeometryObject {
    constructor(position, specular, rotation = null) {
        super(position, specular, rotation);
        this._initGeometry();
    }

    translate(vector3) {
        super.translate(vector3);
        this._initGeometry();
    }

    _initGeometry() {
        let bodyColor = new Color(...Color.normalizeRGBA(114, 73, 53, 255));
        let cushion = new Cuboid(
            new Vector3(this.position.x, this.position.y, this.position.z),
            1.05, 0.55, 0.05,
            new Color(...Color.normalizeRGBA(141, 94, 47, 255)),
            1
        )
        let apron = new Cuboid(
            new Vector3(this.position.x, this.position.y - cushion.height/2 - 0.15/2, this.position.z),
            1.0, 0.5, 0.15,
            bodyColor,
            1
        )
        let leg1 = new Cuboid(
            new Vector3(this.position.x - apron.length/2 + 0.08/2, apron.position.y - apron.height/2 - 0.6/2, this.position.z + apron.width/2 - 0.08/2),
            0.08, 0.08, 0.6,
            bodyColor,
            1
        )
        let leg2 = new Cuboid(
            new Vector3(this.position.x + apron.length/2 - 0.08/2, apron.position.y - apron.height/2 - 0.6/2, this.position.z + apron.width/2 - 0.08/2),
            0.08, 0.08, 0.6,
            bodyColor,
            1
        )
        let leg3 = new Cuboid(
            new Vector3(this.position.x - apron.length/2 + 0.08/2, apron.position.y - apron.height/2 - 0.6/2, this.position.z - apron.width/2 + 0.08/2),
            0.08, 0.08, 0.6,
            bodyColor,
            1
        )
        let leg4 = new Cuboid(
            new Vector3(this.position.x + apron.length/2 - 0.08/2, apron.position.y - apron.height/2 - 0.6/2, this.position.z - apron.width/2 + 0.08/2),
            0.08, 0.08, 0.6,
            bodyColor,
            1
        )
        this.geometries = [
            cushion,
            apron,
            leg1,
            leg2,
            leg3,
            leg4
        ];
    }
}
