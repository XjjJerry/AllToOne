export class ImageLoader {

    __url: string = "";
    __loadContent: Promise<{ width: number, height: number, ctx: CanvasRenderingContext2D }> | null = null;
    __load: Promise<HTMLImageElement> | null = null;

    constructor(url: string) {
        const self = this;
        self.__url = url;
        // 加载图片
        self.load();
    }

    load() {
        const self = this;
        self.__load = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = self.__url;
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (ex) => {
                reject(ex);
            };
        });
        self.__loadContent = new Promise(async (resolve, reject) => {
            const image = await self.__load;
            if (image == null) {
                reject("load image failed");
                return;
            }
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (ctx == null) {
                reject("load failed:get canvas context failed");
                return;
            }
            ctx.drawImage(image, 0, 0);
            resolve({
                width: image.width,
                height: image.height,
                ctx: ctx
            });
        });
    }

    resize(sw: number, sh: number) {
        const self = this;
        self.__loadContent = new Promise(async (resolve, reject) => {
            const image = await self.__load;
            if (image == null) {
                reject("load image failed");
                return;
            }
            const canvas = document.createElement('canvas');
            canvas.width = sw;
            canvas.height = sh;
            const ctx = canvas.getContext('2d');
            if (ctx == null) {
                reject("load failed:get canvas context failed");
                return;
            }
            ctx.drawImage(image, 0, 0, sw, sh);
            resolve({
                width: sw,
                height: sh,
                ctx: ctx
            });
        });
        return self;
    }

    async getImageData(x?: number, y?: number, width?: number, height?: number) {
        const self = this;
        const loadContent = await self.__loadContent;
        if (loadContent == null) {
            throw "get loadContent failed";
        }
        if (x != undefined) {
            if (x < 0 || x >= loadContent.width) {
                throw "x bounds";
            }
        } else {
            x = 0;
        }
        if (y != undefined) {
            if (y < 0 || y >= loadContent.height) {
                throw "y bounds";
            }
        } else {
            y = 0;
        }
        if (width != undefined) {
            if (width <= 0 || x + width > loadContent.width) {
                throw "width bounds";
            }
        } else {
            width = loadContent.width - x;
        }
        if (height != undefined) {
            if (height <= 0 || y + height > loadContent.height) {
                throw "height bounds";
            }
        } else {
            height = loadContent.height - y;
        }
        const imageData = loadContent.ctx.getImageData(x, y, width, height);
        if (imageData == null) {
            throw "load failed:get imageData failed";
        }
        return imageData;
    }

    async getWidth() {
        try {
            const self = this;
            const loadContent = await self.__loadContent;
            if (loadContent == null) {
                throw "get loadContent failed";
            }
            return loadContent.width;
        } catch (ex) {
            console.error(ex);
        }
    }

    async getHeight() {
        try {
            const self = this;
            const loadContent = await self.__loadContent;
            if (loadContent == null) {
                throw "get loadContent failed";
            }
            return loadContent.height;
        } catch (ex) {
            console.error(ex);
        }
    }

}