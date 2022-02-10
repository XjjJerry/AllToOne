var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("ImageBase", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PixelArray = exports.Pixel = void 0;
    var Pixel = /** @class */ (function () {
        function Pixel(red, green, blue, alpha) {
            if (red === void 0) { red = 0; }
            if (green === void 0) { green = 0; }
            if (blue === void 0) { blue = 0; }
            if (alpha === void 0) { alpha = 255; }
            this.red = 0;
            this.green = 0;
            this.blue = 0;
            this.alpha = 0;
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
        }
        Pixel.prototype.scale = function (k) {
            this.red = this.red * k;
            this.green = this.green * k;
            this.blue = this.blue * k;
            this.alpha = this.alpha * k;
        };
        Pixel.toPixelArray = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i += 4) {
                res.push(new Pixel(data[i], data[i + 1], data[i + 2], data[i + 3]));
            }
            return res;
        };
        Pixel.minus = function (item1, item2) {
            return new Pixel(item1.red - item2.red, item1.green - item2.green, item1.blue - item2.blue, item1.alpha - item2.alpha);
        };
        Pixel.plus = function (item1, item2) {
            return new Pixel(item1.red + item2.red, item1.green + item2.green, item1.blue + item2.blue, item1.alpha + item2.alpha);
        };
        Pixel.sum = function (itemArray) {
            if (itemArray.length == 0) {
                return new Pixel(0, 0, 0, 0);
            }
            var res = itemArray[0];
            for (var i = 1; i < itemArray.length; i++) {
                res = Pixel.plus(res, itemArray[i]);
            }
            return res;
        };
        Pixel.multiply = function (item1, item2) {
            return new Pixel(item1.red * item2.red, item1.green * item2.green, item1.blue * item2.blue, item1.alpha * item2.alpha);
        };
        Pixel.divide = function (item1, item2) {
            item2.red = item2.red == 0 ? 1 : item2.red;
            item2.green = item2.green == 0 ? 1 : item2.green;
            item2.blue = item2.blue == 0 ? 1 : item2.blue;
            item2.alpha = item2.alpha == 0 ? 1 : item2.alpha;
            return new Pixel(item1.red / item2.red, item1.green / item2.green, item1.blue / item2.blue, item1.alpha / item2.alpha);
        };
        Pixel.distance = function (item1, item2) {
            var err = Pixel.minus(item1, item2);
            err = Pixel.multiply(err, err);
            var serr = err.red + err.green + err.blue + err.alpha;
            return Math.sqrt(serr);
        };
        Pixel.times = function (item, k) {
            var res = new Pixel(item.red, item.green, item.blue, item.alpha);
            res.scale(k);
            return res;
        };
        return Pixel;
    }());
    exports.Pixel = Pixel;
    var PixelArray = /** @class */ (function () {
        function PixelArray(data) {
            this.__data = new Uint8ClampedArray();
            this.__length = 0;
            this.__data = data;
            this.__length = Math.floor(data.length / 4);
        }
        PixelArray.prototype.getItem = function (index) {
            var self = this;
            var beg = index * 4;
            return new Pixel(self.__data[beg], self.__data[beg + 1], self.__data[beg + 2], self.__data[beg + 3]);
        };
        PixelArray.prototype.sum = function () {
            var self = this;
            var r = 0;
            var g = 0;
            var b = 0;
            var a = 0;
            for (var i = 0; i < self.__data.length; i += 4) {
                r = r + self.__data[i];
                g = g + self.__data[i + 1];
                b = b + self.__data[i + 2];
                a = a + self.__data[i + 3];
            }
            return new Pixel(r, g, b, a);
        };
        PixelArray.prototype.avg = function () {
            var self = this;
            var r = 0;
            var g = 0;
            var b = 0;
            var a = 0;
            for (var i = 0; i < self.__data.length; i += 4) {
                r = r + self.__data[i];
                g = g + self.__data[i + 1];
                b = b + self.__data[i + 2];
                a = a + self.__data[i + 3];
            }
            return new Pixel(r / self.__length, g / self.__length, b / self.__length, a / self.__length);
        };
        PixelArray.prototype.count = function () {
            return this.__length;
        };
        return PixelArray;
    }());
    exports.PixelArray = PixelArray;
});
define("ImageLoader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageLoader = void 0;
    var ImageLoader = /** @class */ (function () {
        function ImageLoader(url) {
            this.__url = "";
            this.__loadContent = null;
            this.__load = null;
            var self = this;
            self.__url = url;
            // 加载图片
            self.load();
        }
        ImageLoader.prototype.load = function () {
            var _this = this;
            var self = this;
            self.__load = new Promise(function (resolve, reject) {
                var image = new Image();
                image.src = self.__url;
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = function (ex) {
                    reject(ex);
                };
            });
            self.__loadContent = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var image, canvas, ctx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, self.__load];
                        case 1:
                            image = _a.sent();
                            if (image == null) {
                                reject("load image failed");
                                return [2 /*return*/];
                            }
                            canvas = document.createElement('canvas');
                            canvas.width = image.width;
                            canvas.height = image.height;
                            ctx = canvas.getContext('2d');
                            if (ctx == null) {
                                reject("load failed:get canvas context failed");
                                return [2 /*return*/];
                            }
                            ctx.drawImage(image, 0, 0);
                            resolve({
                                width: image.width,
                                height: image.height,
                                ctx: ctx
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        ImageLoader.prototype.resize = function (sw, sh) {
            var _this = this;
            var self = this;
            self.__loadContent = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var image, canvas, ctx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, self.__load];
                        case 1:
                            image = _a.sent();
                            if (image == null) {
                                reject("load image failed");
                                return [2 /*return*/];
                            }
                            canvas = document.createElement('canvas');
                            canvas.width = sw;
                            canvas.height = sh;
                            ctx = canvas.getContext('2d');
                            if (ctx == null) {
                                reject("load failed:get canvas context failed");
                                return [2 /*return*/];
                            }
                            ctx.drawImage(image, 0, 0, sw, sh);
                            resolve({
                                width: sw,
                                height: sh,
                                ctx: ctx
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            return self;
        };
        ImageLoader.prototype.getImageData = function (x, y, width, height) {
            return __awaiter(this, void 0, void 0, function () {
                var self, loadContent, imageData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            return [4 /*yield*/, self.__loadContent];
                        case 1:
                            loadContent = _a.sent();
                            if (loadContent == null) {
                                throw "get loadContent failed";
                            }
                            if (x != undefined) {
                                if (x < 0 || x >= loadContent.width) {
                                    throw "x bounds";
                                }
                            }
                            else {
                                x = 0;
                            }
                            if (y != undefined) {
                                if (y < 0 || y >= loadContent.height) {
                                    throw "y bounds";
                                }
                            }
                            else {
                                y = 0;
                            }
                            if (width != undefined) {
                                if (width <= 0 || x + width > loadContent.width) {
                                    throw "width bounds";
                                }
                            }
                            else {
                                width = loadContent.width - x;
                            }
                            if (height != undefined) {
                                if (height <= 0 || y + height > loadContent.height) {
                                    throw "height bounds";
                                }
                            }
                            else {
                                height = loadContent.height - y;
                            }
                            imageData = loadContent.ctx.getImageData(x, y, width, height);
                            if (imageData == null) {
                                throw "load failed:get imageData failed";
                            }
                            return [2 /*return*/, imageData];
                    }
                });
            });
        };
        ImageLoader.prototype.getWidth = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self_1, loadContent, ex_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            self_1 = this;
                            return [4 /*yield*/, self_1.__loadContent];
                        case 1:
                            loadContent = _a.sent();
                            if (loadContent == null) {
                                throw "get loadContent failed";
                            }
                            return [2 /*return*/, loadContent.width];
                        case 2:
                            ex_1 = _a.sent();
                            console.error(ex_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ImageLoader.prototype.getHeight = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self_2, loadContent, ex_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            self_2 = this;
                            return [4 /*yield*/, self_2.__loadContent];
                        case 1:
                            loadContent = _a.sent();
                            if (loadContent == null) {
                                throw "get loadContent failed";
                            }
                            return [2 /*return*/, loadContent.height];
                        case 2:
                            ex_2 = _a.sent();
                            console.error(ex_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return ImageLoader;
    }());
    exports.ImageLoader = ImageLoader;
});
define("ImageCompute", ["require", "exports", "ImageBase"], function (require, exports, ImageBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageCompute = void 0;
    var ImageCompute = /** @class */ (function () {
        function ImageCompute(loader) {
            this.__loader = null;
            var self = this;
            self.__loader = loader;
        }
        ImageCompute.prototype.__computAvgFromData = function (data, width, height) {
            if (width <= 0 || height <= 0) {
                throw "width or height bounds";
            }
            var pArr = new ImageBase_1.PixelArray(data);
            var total = width * height;
            var res = pArr.avg();
            return res;
        };
        ImageCompute.prototype.computeAvg = function () {
            return __awaiter(this, void 0, void 0, function () {
                var self, imageData, width, height, avg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            if (self.__loader == null) {
                                throw "loader is null";
                            }
                            return [4 /*yield*/, self.__loader.getImageData()];
                        case 1:
                            imageData = _a.sent();
                            if (imageData == null) {
                                throw "get imageData failed";
                            }
                            width = imageData.width;
                            height = imageData.height;
                            avg = self.__computAvgFromData(imageData.data, width, height);
                            return [2 /*return*/, avg];
                    }
                });
            });
        };
        ImageCompute.prototype.computeAvgROI = function (x, y, width, height) {
            return __awaiter(this, void 0, void 0, function () {
                var self, imageData, ROIWidth, ROIHeight, avg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            if (self.__loader == null) {
                                throw "loader is null";
                            }
                            return [4 /*yield*/, self.__loader.getImageData(x, y, width, height)];
                        case 1:
                            imageData = _a.sent();
                            if (imageData == null) {
                                throw "get imageData failed";
                            }
                            ROIWidth = imageData.width;
                            ROIHeight = imageData.height;
                            avg = self.__computAvgFromData(imageData.data, ROIWidth, ROIHeight);
                            return [2 /*return*/, avg];
                    }
                });
            });
        };
        ImageCompute.prototype.computeAvgMat = function (divX, divY) {
            return __awaiter(this, void 0, void 0, function () {
                var self, width, height, widthStep, heightStep, widthCount, heightCount, computePromiseList, h, w, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            if (divX < 1 || divY < 1) {
                                throw "div error";
                            }
                            if (self.__loader == null) {
                                throw "loader is null";
                            }
                            return [4 /*yield*/, self.__loader.getWidth()];
                        case 1:
                            width = _a.sent();
                            return [4 /*yield*/, self.__loader.getHeight()];
                        case 2:
                            height = _a.sent();
                            if (width == null || height == null) {
                                throw "get width or height failed";
                            }
                            widthStep = Math.floor(width / divX);
                            heightStep = Math.floor(height / divY);
                            widthCount = Math.floor(width / widthStep);
                            heightCount = Math.floor(height / heightStep);
                            computePromiseList = [];
                            for (h = 0; h < heightCount; h++) {
                                for (w = 0; w < widthCount; w++) {
                                    computePromiseList.push(self.computeAvgROI(w * widthStep, h * heightStep, widthStep, heightStep));
                                }
                            }
                            return [4 /*yield*/, Promise.all(computePromiseList)];
                        case 3:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    mat: result,
                                    widthCount: widthCount,
                                    heightCount: heightCount,
                                    widthStep: widthStep,
                                    heightStep: heightStep
                                }];
                    }
                });
            });
        };
        return ImageCompute;
    }());
    exports.ImageCompute = ImageCompute;
});
define("Puzzle", ["require", "exports", "ImageBase", "ImageLoader"], function (require, exports, ImageBase_2, ImageLoader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Puzzle = void 0;
    var PuzzleConfigs = /** @class */ (function () {
        function PuzzleConfigs(pw, ph, ow, oh) {
            if (pw === void 0) { pw = 1; }
            if (ph === void 0) { ph = 1; }
            if (ow === void 0) { ow = 1; }
            if (oh === void 0) { oh = 1; }
            this.__puzzleWidth = 1;
            this.__puzzleHeight = 1;
            this.__outputWidth = 1;
            this.__outputHeight = 1;
            this.__widthCount = 1;
            this.__heightCount = 1;
            this.setAndCheck(pw, ph, ow, oh);
        }
        PuzzleConfigs.prototype.getPuzzleWidth = function () {
            return this.__puzzleWidth;
        };
        PuzzleConfigs.prototype.getPuzzleHeight = function () {
            return this.__puzzleHeight;
        };
        PuzzleConfigs.prototype.getOutputWidth = function () {
            return this.__outputWidth;
        };
        PuzzleConfigs.prototype.getOutputHeight = function () {
            return this.__outputHeight;
        };
        PuzzleConfigs.prototype.getWidthCount = function () {
            return this.__widthCount;
        };
        PuzzleConfigs.prototype.getHeightCount = function () {
            return this.__heightCount;
        };
        PuzzleConfigs.prototype.setAndCheck = function (pw, ph, ow, oh) {
            pw = Math.floor(pw);
            ph = Math.floor(ph);
            ow = Math.floor(ow);
            oh = Math.floor(oh);
            if (pw < 0 || ph < 0 || ow < 0 || oh < 0) {
                throw "值不能小于0";
            }
            if (ow < pw || oh < ph) {
                throw "输出图片的大小必须大于拼图大小";
            }
            this.__puzzleWidth = pw;
            this.__puzzleHeight = ph;
            if (ow % pw != 0 || oh % ph != 0) {
                console.warn("输出图片的尺寸不是拼图尺寸的整倍数，图片将被截取");
            }
            this.__widthCount = Math.floor(ow / pw);
            this.__heightCount = Math.floor(oh / ph);
            this.__outputWidth = this.__widthCount * pw;
            this.__outputHeight = this.__heightCount * ph;
        };
        return PuzzleConfigs;
    }());
    var Puzzle = /** @class */ (function () {
        function Puzzle(canvasDom) {
            this.__canvasDom = null;
            this.__config = new PuzzleConfigs();
            this.__puzzleList = [];
            this.__source = null;
            this.__widthDiv = 16;
            this.__heightDiv = 16;
            var self = this;
            self.__canvasDom = canvasDom;
        }
        Puzzle.prototype.config = function (puzzleWidth, puzzleHeight, outputWidth, outputHeight) {
            try {
                var self_3 = this;
                self_3.__config = new PuzzleConfigs(puzzleWidth, puzzleHeight, outputWidth, outputHeight);
            }
            catch (ex) {
                console.error(ex);
            }
        };
        Puzzle.prototype.pretreat = function (puzzleUrlList, sourceUrl) {
            var self = this;
            self.__source = new ImageLoader_1.ImageLoader(sourceUrl).resize(self.__widthDiv * self.__config.getWidthCount(), self.__heightDiv * self.__config.getHeightCount());
            self.__puzzleList = puzzleUrlList.map(function (item) { return new ImageLoader_1.ImageLoader(item).resize(self.__widthDiv, self.__heightDiv); });
        };
        Puzzle.prototype.match = function (puzzleList, source) {
            return __awaiter(this, void 0, void 0, function () {
                var self, wc, hc, matchMat, h, w, matchIndex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            wc = self.__config.getWidthCount();
                            hc = self.__config.getHeightCount();
                            matchMat = [];
                            h = 0;
                            _a.label = 1;
                        case 1:
                            if (!(h < hc)) return [3 /*break*/, 6];
                            w = 0;
                            _a.label = 2;
                        case 2:
                            if (!(w < wc)) return [3 /*break*/, 5];
                            return [4 /*yield*/, self.matchROI(puzzleList, source, w, h)];
                        case 3:
                            matchIndex = _a.sent();
                            matchMat.push(matchIndex);
                            _a.label = 4;
                        case 4:
                            w++;
                            return [3 /*break*/, 2];
                        case 5:
                            h++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/, matchMat];
                    }
                });
            });
        };
        Puzzle.prototype.distance = function (sourceData, targetROIData) {
            if (sourceData.length != targetROIData.length) {
                throw "输出图像区域尺寸与拼图尺寸不匹配";
            }
            var SPList = new ImageBase_2.PixelArray(sourceData);
            var TP = new ImageBase_2.PixelArray(targetROIData);
            var errSum = new ImageBase_2.Pixel();
            for (var i = 0; i < SPList.count(); i++) {
                var e = ImageBase_2.Pixel.minus(SPList.getItem(i), TP.getItem(i));
                errSum = ImageBase_2.Pixel.plus(errSum, e);
                // err = err + Math.pow(sourceData[i] - targetROIData[i], 2);
            }
            var re = Math.abs(errSum.red) + Math.abs(errSum.green) + Math.abs(errSum.blue) + Math.abs(errSum.alpha);
            return re;
        };
        Puzzle.prototype.matchROI = function (puzzleList, source, wIndex, hIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var self, roi, mindist, minIndex, p, tmpSourceData, tmpDist;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            return [4 /*yield*/, source.getImageData(wIndex * self.__widthDiv, hIndex * self.__heightDiv, self.__widthDiv, self.__heightDiv)];
                        case 1:
                            roi = _a.sent();
                            mindist = null;
                            minIndex = 0;
                            p = 0;
                            _a.label = 2;
                        case 2:
                            if (!(p < puzzleList.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, puzzleList[p].getImageData(0, 0, self.__widthDiv, self.__heightDiv)];
                        case 3:
                            tmpSourceData = _a.sent();
                            tmpDist = self.distance(tmpSourceData.data, roi.data);
                            if (mindist == null || tmpDist < mindist) {
                                mindist = tmpDist;
                                minIndex = p;
                            }
                            _a.label = 4;
                        case 4:
                            p++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, minIndex];
                    }
                });
            });
        };
        Puzzle.prototype.computePuzzle = function (puzzleUrlList, sourceUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var self_4, matchMat, ctx, pw, ph, wc, hc, m, top_1, left, tmpPuzzle, tmpData, ex_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            self_4 = this;
                            self_4.pretreat(puzzleUrlList, sourceUrl);
                            if (self_4.__source == null) {
                                throw "目前图片不能为空";
                            }
                            return [4 /*yield*/, self_4.match(self_4.__puzzleList, self_4.__source)];
                        case 1:
                            matchMat = _a.sent();
                            console.log(matchMat);
                            if (self_4.__canvasDom == null) {
                                throw "画布不能为null";
                            }
                            self_4.__canvasDom.width = self_4.__config.getOutputWidth();
                            self_4.__canvasDom.height = self_4.__config.getOutputHeight();
                            ctx = self_4.__canvasDom.getContext("2d");
                            if (ctx == null) {
                                throw "获取画布ctx错误";
                            }
                            pw = self_4.__config.getPuzzleWidth();
                            ph = self_4.__config.getPuzzleHeight();
                            wc = self_4.__config.getWidthCount();
                            hc = self_4.__config.getHeightCount();
                            m = 0;
                            _a.label = 2;
                        case 2:
                            if (!(m < matchMat.length)) return [3 /*break*/, 5];
                            top_1 = Math.floor(m / wc) * ph;
                            left = (m % wc) * pw;
                            tmpPuzzle = self_4.__puzzleList[matchMat[m]].resize(pw, ph);
                            return [4 /*yield*/, tmpPuzzle.getImageData()];
                        case 3:
                            tmpData = _a.sent();
                            ctx.putImageData(tmpData, left, top_1);
                            _a.label = 4;
                        case 4:
                            m++;
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            ex_3 = _a.sent();
                            console.error(ex_3);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return Puzzle;
    }());
    exports.Puzzle = Puzzle;
});
define("Render", ["require", "exports", "ImageLoader", "ImageCompute", "ImageBase"], function (require, exports, ImageLoader_2, ImageCompute_1, ImageBase_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Render = void 0;
    var Render = /** @class */ (function () {
        function Render(canvasDom) {
            this.__canvasDom = null;
            var self = this;
            self.__canvasDom = canvasDom;
        }
        Render.prototype.draw = function (imageUrl, rw, rh, x, y, width, height) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var self_5, loader, imageData, ctx, ex_4;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            self_5 = this;
                            loader = new ImageLoader_2.ImageLoader(imageUrl);
                            if (rw != null && rh != null) {
                                loader.resize(rw, rh);
                            }
                            return [4 /*yield*/, loader.getImageData(x, y, width, height)];
                        case 1:
                            imageData = _d.sent();
                            if (imageData && (imageData === null || imageData === void 0 ? void 0 : imageData.data) && ((_a = imageData === null || imageData === void 0 ? void 0 : imageData.data) === null || _a === void 0 ? void 0 : _a.length) && ((_b = imageData === null || imageData === void 0 ? void 0 : imageData.data) === null || _b === void 0 ? void 0 : _b.length)) {
                                if (self_5.__canvasDom != null) {
                                    self_5.__canvasDom.width = imageData.width;
                                    self_5.__canvasDom.height = imageData.height;
                                    ctx = (_c = self_5.__canvasDom) === null || _c === void 0 ? void 0 : _c.getContext("2d");
                                    ctx === null || ctx === void 0 ? void 0 : ctx.putImageData(imageData, 0, 0);
                                }
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            ex_4 = _d.sent();
                            console.error(ex_4);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Render.prototype.drawGray = function (imageUrl, rw, rh, x, y, width, height) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var self_6, loader, imageData, i, red, green, blue, gray, ctx, ex_5;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            self_6 = this;
                            loader = new ImageLoader_2.ImageLoader(imageUrl);
                            if (rw != null && rh != null) {
                                loader.resize(rw, rh);
                            }
                            return [4 /*yield*/, loader.getImageData(x, y, width, height)];
                        case 1:
                            imageData = _c.sent();
                            if (imageData && (imageData === null || imageData === void 0 ? void 0 : imageData.data) && ((_a = imageData === null || imageData === void 0 ? void 0 : imageData.data) === null || _a === void 0 ? void 0 : _a.length) && ((_b = imageData === null || imageData === void 0 ? void 0 : imageData.data) === null || _b === void 0 ? void 0 : _b.length)) {
                                for (i = 0; i < imageData.data.length; i += 4) {
                                    red = imageData.data[i + 0];
                                    green = imageData.data[i + 1];
                                    blue = imageData.data[i + 2];
                                    gray = Math.floor(red * 0.299 + green * 0.587 + blue * 0.114);
                                    imageData.data[i + 0] = gray;
                                    imageData.data[i + 1] = gray;
                                    imageData.data[i + 2] = gray;
                                }
                                if (self_6.__canvasDom != null) {
                                    self_6.__canvasDom.width = imageData.width;
                                    self_6.__canvasDom.height = imageData.height;
                                    ctx = self_6.__canvasDom.getContext("2d");
                                    ctx === null || ctx === void 0 ? void 0 : ctx.putImageData(imageData, 0, 0);
                                }
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            ex_5 = _c.sent();
                            console.error(ex_5);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Render.prototype.drawCombine = function (targetUrl, sourceUrlList, divX, divY, targetScale) {
            var _a;
            if (targetScale === void 0) { targetScale = 1; }
            return __awaiter(this, void 0, void 0, function () {
                var self_7, ttime, targetLoader, targetAvgMat, tw, th, stime, sourceAvgList, ctx, h, w, targetAvg, matchSource, tmpImageData, ex_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 11, , 12]);
                            self_7 = this;
                            ttime = new Date().getTime();
                            targetLoader = new ImageLoader_2.ImageLoader(targetUrl);
                            return [4 /*yield*/, new ImageCompute_1.ImageCompute(targetLoader).computeAvgMat(divX, divY)];
                        case 1:
                            targetAvgMat = _b.sent();
                            if (targetAvgMat == null) {
                                throw "compute target mat failed";
                            }
                            return [4 /*yield*/, targetLoader.getWidth()];
                        case 2:
                            tw = _b.sent();
                            return [4 /*yield*/, targetLoader.getHeight()];
                        case 3:
                            th = _b.sent();
                            if (targetScale != 1) {
                                tw = tw ? tw * targetScale : 1;
                                th = th ? th * targetScale : 1;
                                targetLoader.resize(tw, th);
                                targetAvgMat.widthStep = Math.floor(targetAvgMat.widthStep * targetScale);
                                targetAvgMat.heightStep = Math.floor(targetAvgMat.heightStep * targetScale);
                            }
                            console.log("init target cost:", new Date().getTime() - ttime, "ms");
                            stime = new Date().getTime();
                            return [4 /*yield*/, self_7.__getAndInitSource(sourceUrlList, targetAvgMat.widthStep, targetAvgMat.heightStep)];
                        case 4:
                            sourceAvgList = _b.sent();
                            if (sourceAvgList == null) {
                                throw "compute sourceAvgList failed";
                            }
                            console.log("init source cost:", new Date().getTime() - stime, "ms");
                            if (self_7.__canvasDom != null) {
                                self_7.__canvasDom.width = tw ? tw : 1;
                                self_7.__canvasDom.height = th ? th : 1;
                            }
                            ctx = (_a = self_7.__canvasDom) === null || _a === void 0 ? void 0 : _a.getContext("2d");
                            h = 0;
                            _b.label = 5;
                        case 5:
                            if (!(h < targetAvgMat.heightCount)) return [3 /*break*/, 10];
                            w = 0;
                            _b.label = 6;
                        case 6:
                            if (!(w < targetAvgMat.widthCount)) return [3 /*break*/, 9];
                            targetAvg = targetAvgMat.mat[h * targetAvgMat.widthCount + w];
                            if (targetAvg == null) {
                                throw "get target mat item failed";
                            }
                            matchSource = self_7.__matchSource(sourceAvgList, targetAvg);
                            return [4 /*yield*/, (matchSource === null || matchSource === void 0 ? void 0 : matchSource.loader.getImageData())];
                        case 7:
                            tmpImageData = _b.sent();
                            if (tmpImageData != null) {
                                ctx === null || ctx === void 0 ? void 0 : ctx.putImageData(tmpImageData, w * targetAvgMat.widthStep, h * targetAvgMat.heightStep);
                            }
                            _b.label = 8;
                        case 8:
                            w++;
                            return [3 /*break*/, 6];
                        case 9:
                            h++;
                            return [3 /*break*/, 5];
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            ex_6 = _b.sent();
                            console.error(ex_6);
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        Render.prototype.drawCombineWithDither = function (targetUrl, sourceUrlList, divX, divY, targetScale) {
            var _a;
            if (targetScale === void 0) { targetScale = 1; }
            return __awaiter(this, void 0, void 0, function () {
                var self_8, ttime, targetLoader, targetAvgMat, tw, th, stime, sourceAvgList, ctx, h, w, index, targetAvg, matchSource, err, rindex, rerr, bindex, berr, rbindex, rberr, tmpImageData, ex_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 11, , 12]);
                            self_8 = this;
                            ttime = new Date().getTime();
                            targetLoader = new ImageLoader_2.ImageLoader(targetUrl);
                            return [4 /*yield*/, new ImageCompute_1.ImageCompute(targetLoader).computeAvgMat(divX, divY)];
                        case 1:
                            targetAvgMat = _b.sent();
                            if (targetAvgMat == null) {
                                throw "compute target mat failed";
                            }
                            return [4 /*yield*/, targetLoader.getWidth()];
                        case 2:
                            tw = _b.sent();
                            return [4 /*yield*/, targetLoader.getHeight()];
                        case 3:
                            th = _b.sent();
                            if (targetScale != 1) {
                                tw = tw ? tw * targetScale : 1;
                                th = th ? th * targetScale : 1;
                                targetLoader.resize(tw, th);
                                targetAvgMat.widthStep = Math.floor(targetAvgMat.widthStep * targetScale);
                                targetAvgMat.heightStep = Math.floor(targetAvgMat.heightStep * targetScale);
                            }
                            console.log("init target cost:", new Date().getTime() - ttime, "ms");
                            stime = new Date().getTime();
                            return [4 /*yield*/, self_8.__getAndInitSource(sourceUrlList, targetAvgMat.widthStep, targetAvgMat.heightStep)];
                        case 4:
                            sourceAvgList = _b.sent();
                            if (sourceAvgList == null) {
                                throw "compute sourceAvgList failed";
                            }
                            console.log("init source cost:", new Date().getTime() - stime, "ms");
                            if (self_8.__canvasDom != null) {
                                self_8.__canvasDom.width = tw ? tw : 1;
                                self_8.__canvasDom.height = th ? th : 1;
                            }
                            ctx = (_a = self_8.__canvasDom) === null || _a === void 0 ? void 0 : _a.getContext("2d");
                            h = 0;
                            _b.label = 5;
                        case 5:
                            if (!(h < targetAvgMat.heightCount)) return [3 /*break*/, 10];
                            w = 0;
                            _b.label = 6;
                        case 6:
                            if (!(w < targetAvgMat.widthCount)) return [3 /*break*/, 9];
                            index = h * targetAvgMat.widthCount + w;
                            targetAvg = targetAvgMat.mat[index];
                            if (targetAvg == null) {
                                throw "get target mat item failed";
                            }
                            matchSource = self_8.__matchSource(sourceAvgList, targetAvg);
                            if (matchSource == null) {
                                throw "找不到啊";
                            }
                            err = ImageBase_3.Pixel.minus(matchSource.avg, targetAvg);
                            if (w < targetAvgMat.widthCount - 1) {
                                rindex = h * targetAvgMat.widthCount + w + 1;
                                rerr = ImageBase_3.Pixel.times(err, 3 / 8);
                                targetAvgMat.mat[rindex] = ImageBase_3.Pixel.plus(targetAvgMat.mat[rindex], rerr);
                            }
                            if (h < targetAvgMat.heightCount - 1) {
                                bindex = (h + 1) * targetAvgMat.widthCount + w;
                                berr = ImageBase_3.Pixel.times(err, 3 / 8);
                                targetAvgMat.mat[bindex] = ImageBase_3.Pixel.plus(targetAvgMat.mat[bindex], berr);
                            }
                            if (w < targetAvgMat.widthCount - 1 && h < targetAvgMat.heightCount - 1) {
                                rbindex = (h + 1) * targetAvgMat.widthCount + w + 1;
                                rberr = ImageBase_3.Pixel.times(err, 1 / 4);
                                targetAvgMat.mat[rbindex] = ImageBase_3.Pixel.plus(targetAvgMat.mat[rbindex], rberr);
                            }
                            return [4 /*yield*/, matchSource.loader.getImageData()];
                        case 7:
                            tmpImageData = _b.sent();
                            if (tmpImageData != null) {
                                ctx === null || ctx === void 0 ? void 0 : ctx.putImageData(tmpImageData, w * targetAvgMat.widthStep, h * targetAvgMat.heightStep);
                            }
                            _b.label = 8;
                        case 8:
                            w++;
                            return [3 /*break*/, 6];
                        case 9:
                            h++;
                            return [3 /*break*/, 5];
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            ex_7 = _b.sent();
                            console.error(ex_7);
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        Render.prototype.__initSource = function (url, width, height) {
            return __awaiter(this, void 0, void 0, function () {
                var tmpLoader, tmpCom, avg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tmpLoader = new ImageLoader_2.ImageLoader(url);
                            tmpLoader.resize(32, 32);
                            tmpCom = new ImageCompute_1.ImageCompute(tmpLoader);
                            return [4 /*yield*/, tmpCom.computeAvg()];
                        case 1:
                            avg = _a.sent();
                            tmpLoader.resize(width, height);
                            return [2 /*return*/, {
                                    avg: avg,
                                    loader: tmpLoader
                                }];
                    }
                });
            });
        };
        Render.prototype.__getAndInitSource = function (urlList, width, height) {
            return __awaiter(this, void 0, void 0, function () {
                var self, avgPromiseList, i, sourceList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            avgPromiseList = [];
                            for (i = 0; i < urlList.length; i++) {
                                avgPromiseList.push(self.__initSource(urlList[i], width, height));
                            }
                            return [4 /*yield*/, Promise.all(avgPromiseList)];
                        case 1:
                            sourceList = _a.sent();
                            return [2 /*return*/, sourceList];
                    }
                });
            });
        };
        Render.prototype.__matchSource = function (sourceList, target) {
            var self = this;
            var minDist = null;
            var minIndex = null;
            for (var i = 0; i < sourceList.length; i++) {
                var tmpAvg = sourceList[i].avg;
                if (tmpAvg == null) {
                    continue;
                }
                var dist = ImageBase_3.Pixel.distance(tmpAvg, target);
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
        };
        return Render;
    }());
    exports.Render = Render;
});
define("allToOne", ["require", "exports", "ImageCompute", "ImageLoader", "Render", "Puzzle"], function (require, exports, ImageCompute_2, ImageLoader_3, Render_1, Puzzle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Puzzle = exports.Render = exports.ImageLoader = exports.ImageCompute = void 0;
    Object.defineProperty(exports, "ImageCompute", { enumerable: true, get: function () { return ImageCompute_2.ImageCompute; } });
    Object.defineProperty(exports, "ImageLoader", { enumerable: true, get: function () { return ImageLoader_3.ImageLoader; } });
    Object.defineProperty(exports, "Render", { enumerable: true, get: function () { return Render_1.Render; } });
    Object.defineProperty(exports, "Puzzle", { enumerable: true, get: function () { return Puzzle_1.Puzzle; } });
});
