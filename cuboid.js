export class Cuboid {
    constructor(centroid, dimension, color, constant) {
        this.centroid = {
            x: centroid.x,
            y: centroid.y,
            z: centroid.z
        };
        this.dimension = {
            length: dimension.length,
            height: dimension.height,
            width: dimension.width
        };
        this.color = {
            r: color.r / 255,
            g: color.g / 255,
            b: color.b / 255
        };
        this.constant = {
            shininess: constant.shininess
        };
        this.vertices = [];
        this.indices = [
             0,  1,  2,   0,  2,  3,   
             4,  5,  6,   4,  6,  7,   
             8,  9, 10,   8, 10, 11, 
            12, 13, 14,  12, 14, 15,
            16, 17, 18,  16, 18, 19,
            20, 21, 22,  20, 22, 23,     
        ];

        this.vertexStartIndex = -1;
        this.vertexEndIndex = -1;

        this.build();
    }
    build() {
        let normals = [
            [ 0,  0, -1],
            [ 0,  0,  1],
            [-1,  0,  0],
            [ 1,  0,  0],
            [ 0, -1,  0],
            [ 0,  1,  0]
        ];

        let signs = [
            [
                [-1.0, -1.0, -1.0],
                [ 1.0, -1.0, -1.0],
                [ 1.0,  1.0, -1.0],
                [-1.0,  1.0, -1.0]
            ],
            [
                [-1.0, -1.0, 1.0],
                [ 1.0, -1.0, 1.0],
                [ 1.0,  1.0, 1.0],
                [-1.0,  1.0, 1.0]
            ],
            [
                [-1.0, -1.0, -1.0],
                [-1.0,  1.0, -1.0],
                [-1.0,  1.0,  1.0],
                [-1.0, -1.0,  1.0]
            ],
            [
                [1.0, -1.0, -1.0],
                [1.0,  1.0, -1.0],
                [1.0,  1.0,  1.0],
                [1.0, -1.0,  1.0]
            ],
            [
                [-1.0, -1.0, -1.0],
                [-1.0, -1.0,  1.0],
                [ 1.0, -1.0,  1.0],
                [ 1.0, -1.0, -1.0]
            ],
            [
                [-1.0, 1.0, -1.0],
                [-1.0, 1.0,  1.0],
                [ 1.0, 1.0,  1.0],
                [ 1.0, 1.0, -1.0]
            ]
        ];

        let halfLength = this.dimension.length / 2;
        let halfHeight = this.dimension.height / 2;
        let halfWidth = this.dimension.width / 2;

        for(let i = 0; i < normals.length; i++) {
            this.generateFaceVertices(signs[i], halfLength, halfHeight, halfWidth, normals[i], i);
        }
    }
    generateFaceVertices(sign, halfLength, halfHeight, halfWidth, normal, i) {
        let faceVertices = [];
        const VERTEX_COUNT = 4;

        for(let i = 0; i < VERTEX_COUNT; i++) {
            faceVertices.push([
                this.centroid.x + sign[i][0] * halfLength,
                this.centroid.y + sign[i][1] * halfHeight,
                this.centroid.z + sign[i][2] * halfWidth
            ]);
        }

        // let faceNormal = faceNormal = this.calculateCrossProduct(
        //     this.convertPointsToVector(faceVertices[0], faceVertices[3]),
        //     this.convertPointsToVector(faceVertices[0], faceVertices[1])
        // );

        // // flip the normal for the parallel plane
        // if(i % 2 != 0) {
        //     faceNormal = this.reverseVector(faceNormal);
        // }

        // let normalizedFaceNormal = this.normalizeVector(
        //     faceNormal,
        //     this.calculateVectorLength(faceNormal)
        // )

        // console.log(normalizedFaceNormal);

        for(let i = 0; i < VERTEX_COUNT; i++) {
            this.vertices.push(
                ...this.getVertexArray(
                    ...faceVertices[i],
                    normal
                )
            );
        }
    }
    convertAngleToRadian(angle) {
        return angle * Math.PI / 180;
    }
    reverseVector(vector) {
        let reversedVector = [...vector];
        for(let i = 0; i < reversedVector.length; i++) {
            // avoid producing -0.0
            if(reversedVector[i] != 0.0) {
                reversedVector[i] *= -1.0;
            }
        }
        return reversedVector;
    }
    calculateVectorLength(vector) {
        return Math.sqrt(
            vector[0] * vector[0] +
            vector[1] * vector[1] +
            vector[2] * vector[2]
        )
    }
    convertPointsToVector(point1, point2) {
        return [
            point2[0] - point1[0],
            point2[1] - point1[1],
            point2[2] - point1[2]
        ];
    }
    calculateCrossProduct(vector1, vector2) {
        return [
            vector1[1] * vector2[2] - vector1[2] * vector2[1],
            vector1[2] * vector2[0] - vector1[0] * vector2[2],
            vector1[0] * vector2[1] - vector1[1] * vector2[0]
        ];
    }
    normalizeVector(vector, vectorLength) {
        return [
            vector[0] / vectorLength,
            vector[1] / vectorLength,
            vector[2] / vectorLength,
        ];
    }
    getVertexArray(x, y, z, normal) {
        return [
            x,
            y,
            z,
            this.color.r,
            this.color.g,
            this.color.b,
            ...normal,
            this.constant.shininess
        ];
    }
}