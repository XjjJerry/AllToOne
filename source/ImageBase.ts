class Pixel {
    red: number = 0;
    green: number = 0;
    blue: number = 0;
    alpha: number = 0;

    constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    scale(k: number) {
        this.red = this.red * k;
        this.green = this.green * k;
        this.blue = this.blue * k;
        this.alpha = this.alpha * k;
    }

    static toPixelArray(data: Uint8ClampedArray) {
        let res: Pixel[] = [];
        for (let i = 0; i < data.length; i += 4) {
            res.push(new Pixel(data[i], data[i + 1], data[i + 2], data[i + 3]));
        }
        return res;
    }

    static minus(item1: Pixel, item2: Pixel) {
        return new Pixel(item1.red - item2.red, item1.green - item2.green, item1.blue - item2.blue, item1.alpha - item2.alpha);
    }

    static plus(item1: Pixel, item2: Pixel) {
        return new Pixel(item1.red + item2.red, item1.green + item2.green, item1.blue + item2.blue, item1.alpha + item2.alpha);
    }

    static sum(itemArray: Pixel[]) {
        if (itemArray.length == 0) {
            return new Pixel(0, 0, 0, 0);
        }
        let res = itemArray[0];
        for (let i = 1; i < itemArray.length; i++) {
            res = Pixel.plus(res, itemArray[i]);
        }
        return res;
    }

    static multiply(item1: Pixel, item2: Pixel) {
        return new Pixel(item1.red * item2.red, item1.green * item2.green, item1.blue * item2.blue, item1.alpha * item2.alpha);
    }

    static divide(item1: Pixel, item2: Pixel) {
        item2.red = item2.red == 0 ? 1 : item2.red;
        item2.green = item2.green == 0 ? 1 : item2.green;
        item2.blue = item2.blue == 0 ? 1 : item2.blue;
        item2.alpha = item2.alpha == 0 ? 1 : item2.alpha;
        return new Pixel(item1.red / item2.red, item1.green / item2.green, item1.blue / item2.blue, item1.alpha / item2.alpha);
    }

    static distance(item1: Pixel, item2: Pixel) {
        let err = Pixel.minus(item1, item2);
        err = Pixel.multiply(err, err);
        let serr = err.red + err.green + err.blue + err.alpha;
        return Math.sqrt(serr);
    }
}

class PixelArray {
    __data: Uint8ClampedArray = new Uint8ClampedArray();
    __length: number = 0;
    constructor(data: Uint8ClampedArray) {
        this.__data = data;
        this.__length = Math.floor(data.length / 4);
    }

    getItem(index: number) {
        const self = this;
        let beg = index * 4;
        return new Pixel(self.__data[beg], self.__data[beg + 1], self.__data[beg + 2], self.__data[beg + 3]);
    }

    sum() {
        const self = this;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        for (let i = 0; i < self.__data.length; i += 4) {
            r = r + self.__data[i];
            g = g + self.__data[i + 1];
            b = b + self.__data[i + 2];
            a = a + self.__data[i + 3];
        }
        return new Pixel(r, g, b, a);
    }

    avg() {
        const self = this;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        for (let i = 0; i < self.__data.length; i += 4) {
            r = r + self.__data[i];
            g = g + self.__data[i + 1];
            b = b + self.__data[i + 2];
            a = a + self.__data[i + 3];
        }
        return new Pixel(r / self.__length, g / self.__length, b / self.__length, a / self.__length);
    }
}

export {
    Pixel,
    PixelArray
}