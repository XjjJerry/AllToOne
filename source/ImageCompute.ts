import { ImageLoader } from "./ImageLoader";
import { PixelArray } from "./ImageBase";

export class ImageCompute {
    __loader: ImageLoader | null = null;
    constructor(loader: ImageLoader) {
        const self = this;
        self.__loader = loader;
    }

    __computAvgFromData(data: Uint8ClampedArray, width: number, height: number) {
        if (width <= 0 || height <= 0) {
            throw "width or height bounds";
        }
        let pArr = new PixelArray(data);
        let total = width * height;
        let res = pArr.avg();
        return res;
    }

    async computeAvg() {
        const self = this;
        if (self.__loader == null) {
            throw "loader is null";
        }
        const imageData = await self.__loader.getImageData();
        if (imageData == null) {
            throw "get imageData failed";
        }
        const width = imageData.width;
        const height = imageData.height;
        let avg = self.__computAvgFromData(imageData.data, width, height);
        return avg;
    }

    async computeAvgROI(x?: number, y?: number, width?: number, height?: number) {
        const self = this;
        if (self.__loader == null) {
            throw "loader is null";
        }
        const imageData = await self.__loader.getImageData(x, y, width, height);
        if (imageData == null) {
            throw "get imageData failed";
        }
        const ROIWidth = imageData.width;
        const ROIHeight = imageData.height;
        let avg = self.__computAvgFromData(imageData.data, ROIWidth, ROIHeight);
        return avg;
    }

    async computeAvgMat(divX: number, divY: number) {
        const self = this;
        if (divX < 1 || divY < 1) {
            throw "div error";
        }
        if (self.__loader == null) {
            throw "loader is null";
        }
        const width = await self.__loader.getWidth();
        const height = await self.__loader.getHeight();
        if (width == null || height == null) {
            throw "get width or height failed";
        }
        let widthStep = Math.floor(width / divX);
        let heightStep = Math.floor(height / divY);

        let widthCount = Math.floor(width / widthStep);
        let heightCount = Math.floor(height / heightStep);

        let computePromiseList = [];
        for (let h = 0; h < heightCount; h++) {
            for (let w = 0; w < widthCount; w++) {
                computePromiseList.push(self.computeAvgROI(w * widthStep, h * heightStep, widthStep, heightStep));
            }
        }
        let result = await Promise.all(computePromiseList);
        return {
            mat: result,
            widthCount: widthCount,
            heightCount: heightCount,
            widthStep: widthStep,
            heightStep: heightStep
        };
    }

    // async computeAvg1() {
    //     try {
    //         const self = this;
    //         if (self.__loader == null) {
    //             throw "loader is null";
    //         }
    //         let width = await self.__loader.getWidth();
    //         let height = await self.__loader.getHeight();
    //         let sw = width ? Math.floor(width / 3) : 1;
    //         let sh = height ? Math.floor(height / 3) : 1;
    //         let res: number[] = [];
    //         for (let h = 0; h < 3; h++) {
    //             for (let w = 0; w < 3; w++) {
    //                 let tmp = await self.computeAvgROI(w * sw, h * sh, sw, sh);
    //                 if (tmp == null) {
    //                     continue;
    //                 }
    //                 res = res.concat(tmp);
    //             }
    //         }
    //         return res;

    //     } catch (ex) {
    //         console.error(ex);
    //     }
    // }

    // async computeAvgROI1(x: number, y: number, width: number, height: number) {
    //     try {
    //         const self = this;
    //         if (self.__loader == null) {
    //             throw "loader is null";
    //         }
    //         let sw = width ? Math.floor(width / 3) : 1;
    //         let sh = height ? Math.floor(height / 3) : 1;

    //         let res: number[] = [];
    //         for (let h = 0; h < 3; h++) {
    //             for (let w = 0; w < 3; w++) {
    //                 let imageData = await self.__loader.getImageData(x + w * sw, y + h * sh, sw, sh);
    //                 if (imageData == null) {
    //                     throw "get imageData failed";
    //                 }
    //                 let ROIWidth = imageData.width;
    //                 let ROIHeight = imageData.height;
    //                 let avg = self.__computAvgFromData(imageData.data, ROIWidth, ROIHeight);
    //                 res = res.concat(avg);
    //             }
    //         }
    //         return res;
    //     } catch (ex) {
    //         console.error(ex);
    //     }
    // }

    // async computeAvgMat1(divX: number, divY: number) {
    //     try {
    //         const self = this;
    //         if (divX < 1 || divY < 1) {
    //             throw "div error";
    //         }
    //         if (self.__loader == null) {
    //             throw "loader is null";
    //         }
    //         const width = await self.__loader.getWidth();
    //         const height = await self.__loader.getHeight();
    //         if (width == null || height == null) {
    //             throw "get width or height failed";
    //         }
    //         let widthStep = Math.floor(width / divX);
    //         let heightStep = Math.floor(height / divY);

    //         let widthCount = Math.floor(width / widthStep);
    //         let heightCount = Math.floor(height / heightStep);

    //         let computePromiseList = [];
    //         for (let h = 0; h < heightCount; h++) {
    //             for (let w = 0; w < widthCount; w++) {
    //                 computePromiseList.push(self.computeAvgROI1(w * widthStep, h * heightStep, widthStep, heightStep));
    //             }
    //         }
    //         let result = await Promise.all(computePromiseList);
    //         return {
    //             mat: result,
    //             widthCount: widthCount,
    //             heightCount: heightCount,
    //             widthStep: widthStep,
    //             heightStep: heightStep
    //         };
    //     } catch (ex) {
    //         console.error(ex);
    //     }
    // }

}