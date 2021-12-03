export class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static normalizeRGBA(r, g, b, a) {
        let MAX_VALUE = 255;
        return [r / MAX_VALUE, g / MAX_VALUE, b / MAX_VALUE, a / MAX_VALUE];
    }

    static convertArrayOfColorsToFloatArray(arrayOfColors) {
        let float_array = [];
        arrayOfColors.forEach(color => {
            float_array.push(...color.toArray())
        })
        return float_array;
    }

    toArray() {
        return [
            this.r,
            this.g,
            this.b,
            this.a
        ];
    }
}
