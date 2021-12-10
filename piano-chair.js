import {Cuboid} from "./cuboid.js"

export class PianoChair {
    constructor(centroid, constant) {
        this.centroid = {
            x: centroid.x,
            y: centroid.y,
            z: centroid.z
        };
        this.constant = {
            shininess: constant.shininess
        };
        this.polyhedrons = [];
        this.vertices = [];
        this.indices = [];

        this.vertexStartIndex = -1;
        this.vertexEndIndex = -1;
        
        this.build();
    }
    build() {
        let seat = new Cuboid(
            {x: this.centroid.x, y: this.centroid.y, z: this.centroid.z},
            {length: 1.05, height: 0.05, width: 0.55},
            {r: 141, g: 94, b: 47},
            {shininess: this.constant.shininess}
        );

        let apron = new Cuboid(
            {x: this.centroid.x, y: this.centroid.y - seat.dimension.height/2 - 0.15/2, z: this.centroid.z},
            {length: 1.0, height: 0.15, width: 0.5},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg1 = new Cuboid(
            {x: this.centroid.x - apron.dimension.length/2 + 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z + apron.dimension.width/2 - 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg2 = new Cuboid(
            {x: this.centroid.x + apron.dimension.length/2 - 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z + apron.dimension.width/2 - 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg3 = new Cuboid(
            {x: this.centroid.x - apron.dimension.length/2 + 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z - apron.dimension.width/2 + 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg4 = new Cuboid(
            {x: this.centroid.x + apron.dimension.length/2 - 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z - apron.dimension.width/2 + 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        this.polyhedrons = [
            seat,
            apron,
            leg1,
            leg2,
            leg3,
            leg4
        ];
        this.updateVertices();
        this.updateIndices();
    }
    updateVertices() {
        for(let i = 0; i < this.polyhedrons.length; i++) {
            this.vertices.push(
                ...this.polyhedrons[i].vertices
            )
        }
    }
    updateIndices() {
        if(this.polyhedrons.length == 0) {
            return;
        }
        this.indices.push(
            ...this.polyhedrons[0].indices
        );
        for(let i = 1; i < this.polyhedrons.length; i++) {
            let offset = Math.max(...this.indices) + 1;
            let newIndices = [...this.indices];
            for(let i = 0; i < this.indices.length; i++) {
                newIndices[i] += offset;
            }
            this.indices.push(
                ...newIndices
            );
        }
    }
}

export class PianoChairRotated {
    constructor(centroid, constant) {
        this.centroid = {
            x: centroid.x,
            y: centroid.y,
            z: centroid.z
        };
        this.constant = {
            shininess: constant.shininess
        };
        this.polyhedrons = [];
        this.vertices = [];
        this.indices = [];
        this.vertexStartIndex = -1;
        this.vertexEndIndex = -1;
        this.build();
    }
    build() {
        let seat = new Cuboid(
            {x: this.centroid.x, y: this.centroid.y, z: this.centroid.z},
            {length: 0.55, height: 0.05, width: 1.05},
            {r: 141, g: 94, b: 47},
            {shininess: this.constant.shininess}
        );

        let apron = new Cuboid(
            {x: this.centroid.x, y: this.centroid.y - seat.dimension.height/2 - 0.15/2, z: this.centroid.z},
            {length: 0.5, height: 0.15, width: 1.0},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg1 = new Cuboid(
            {x: this.centroid.x - apron.dimension.length/2 + 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z + apron.dimension.width/2 - 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg2 = new Cuboid(
            {x: this.centroid.x + apron.dimension.length/2 - 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z + apron.dimension.width/2 - 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg3 = new Cuboid(
            {x: this.centroid.x - apron.dimension.length/2 + 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z - apron.dimension.width/2 + 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        let leg4 = new Cuboid(
            {x: this.centroid.x + apron.dimension.length/2 - 0.08/2, y: apron.centroid.y - apron.dimension.height/2 - 0.6/2, z: this.centroid.z - apron.dimension.width/2 + 0.08/2},
            {length: 0.08, height: 0.6, width: 0.08},
            {r: 114, g: 73, b: 53},
            {shininess: this.constant.shininess}
        );
        this.polyhedrons = [
            seat,
            apron,
            leg1,
            leg2,
            leg3,
            leg4
        ];
        this.updateVertices();
        this.updateIndices();
    }
    updateVertices() {
        for(let i = 0; i < this.polyhedrons.length; i++) {
            this.vertices.push(
                ...this.polyhedrons[i].vertices
            )
        }
    }
    updateIndices() {
        if(this.polyhedrons.length == 0) {
            return;
        }
        this.indices.push(
            ...this.polyhedrons[0].indices
        );
        for(let i = 1; i < this.polyhedrons.length; i++) {
            let offset = Math.max(...this.indices) + 1;
            let newIndices = [...this.indices];
            for(let i = 0; i < this.indices.length; i++) {
                newIndices[i] += offset;
            }
            this.indices.push(
                ...newIndices
            );
        }
    }
}