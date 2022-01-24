import { ImageLoader } from "./ImageLoader";
import { ImageCompute } from "./ImageCompute";
import { PixelArray, Pixel } from "./ImageBase";

export class Render {
    __canvasDom: HTMLCanvasElement | null = null;

    constructor(canvasDom: HTMLCanvasElement) {
        const self = this;
        self.__canvasDom = canvasDom;
    }

    async draw(imageUrl: string, rw?: number, rh?: number, x?: number, y?: number, width?: number, height?: number) {
        try {
            const self = this;
            const loader = new ImageLoader(imageUrl);
            if (rw != null && rh != null) {
                loader.resize(rw, rh);
            }
            const imageData = await loader.getImageData(x, y, width, height);
            if (imageData && imageData?.data && imageData?.data?.length && imageData?.data?.length) {
                if (self.__canvasDom != null) {
                    self.__canvasDom.width = imageData.width;
                    self.__canvasDom.height = imageData.height;
                    let ctx = self.__canvasDom?.getContext("2d");
                    ctx?.putImageData(imageData, 0, 0);
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    async drawGray(imageUrl: string, rw?: number, rh?: number, x?: number, y?: number, width?: number, height?: number) {
        try {
            const self = this;
            const loader = new ImageLoader(imageUrl);
            if (rw != null && rh != null) {
                loader.resize(rw, rh);
            }
            const imageData = await loader.getImageData(x, y, width, height);
            if (imageData && imageData?.data && imageData?.data?.length && imageData?.data?.length) {
                for (let i = 0; i < imageData.data.length; i += 4) {
                    let red = imageData.data[i + 0];
                    let green = imageData.data[i + 1];
                    let blue = imageData.data[i + 2];
                    let gray = Math.floor(red * 0.299 + green * 0.587 + blue * 0.114);
                    imageData.data[i + 0] = gray;
                    imageData.data[i + 1] = gray;
                    imageData.data[i + 2] = gray;
                }
                if (self.__canvasDom != null) {
                    self.__canvasDom.width = imageData.width;
                    self.__canvasDom.height = imageData.height;
                    let ctx = self.__canvasDom.getContext("2d");
                    ctx?.putImageData(imageData, 0, 0);
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    async drawCombine(targetUrl: string, sourceUrlList: [string], divX: number, divY: number, targetScale: number = 1) {
        try {
            const self = this;

            let ttime = new Date().getTime();
            let targetLoader = new ImageLoader(targetUrl);

            let targetAvgMat = await new ImageCompute(targetLoader).computeAvgMat(divX, divY);
            if (targetAvgMat == null) {
                throw "compute target mat failed";
            }
            let tw = await targetLoader.getWidth();
            let th = await targetLoader.getHeight();
            if (targetScale != 1) {
                tw = tw ? tw * targetScale : 1;
                th = th ? th * targetScale : 1;
                targetLoader.resize(tw, th);
                targetAvgMat.widthStep = Math.floor(targetAvgMat.widthStep * targetScale);
                targetAvgMat.heightStep = Math.floor(targetAvgMat.heightStep * targetScale);
            }
            console.log("init target cost:", new Date().getTime() - ttime, "ms");

            let stime = new Date().getTime();

            let sourceAvgList = await self.__getAndInitSource(sourceUrlList, targetAvgMat.widthStep, targetAvgMat.heightStep);
            if (sourceAvgList == null) {
                throw "compute sourceAvgList failed";
            }

            console.log("init source cost:", new Date().getTime() - stime, "ms");
            if (self.__canvasDom != null) {
                self.__canvasDom.width = tw ? tw : 1;
                self.__canvasDom.height = th ? th : 1;
            }
            let ctx = self.__canvasDom?.getContext("2d");
            for (let h = 0; h < targetAvgMat.heightCount; h++) {
                for (let w = 0; w < targetAvgMat.widthCount; w++) {
                    let targetAvg = targetAvgMat.mat[h * targetAvgMat.widthCount + w];
                    if (targetAvg == null) {
                        throw "get target mat item failed";
                    }
                    let matchSource = self.__matchSource(sourceAvgList, targetAvg);
                    let tmpImageData = await matchSource?.loader.getImageData();
                    if (tmpImageData != null) {
                        ctx?.putImageData(tmpImageData, w * targetAvgMat.widthStep, h * targetAvgMat.heightStep);
                    }
                }
            }

        } catch (ex) {
            console.error(ex);
        }
    }

    async __initSource(url: string, width: number, height: number) {
        let tmpLoader = new ImageLoader(url);
        tmpLoader.resize(32, 32);
        let tmpCom = new ImageCompute(tmpLoader);
        let avg = await tmpCom.computeAvg();
        tmpLoader.resize(width, height);
        return {
            avg: avg,
            loader: tmpLoader
        };
    }

    async __getAndInitSource(urlList: [string], width: number, height: number) {
        const self = this;
        let avgPromiseList = [];
        for (let i = 0; i < urlList.length; i++) {
            avgPromiseList.push(self.__initSource(urlList[i], width, height));
        }
        let sourceList = await Promise.all(avgPromiseList);
        return sourceList;
    }

    __matchSource(sourceList: {
        avg: Pixel;
        loader: ImageLoader;
    }[], target: Pixel) {
        const self = this;
        let minDist = null;
        let minIndex = null;
        for (let i = 0; i < sourceList.length; i++) {
            let tmpAvg = sourceList[i].avg;
            if (tmpAvg == null) {
                continue;
            }
            let dist = Pixel.distance(tmpAvg, target);
            if (minIndex == null || minDist == null) {
                minIndex = i;
                minDist = dist;
                continue;
            }
            if (dist < minDist) {
                minDist = dist;
                minIndex = i;
            }
        }
        if (minIndex == null) {
            throw "find min distance failed";
        }
        return sourceList[minIndex];
    }


}