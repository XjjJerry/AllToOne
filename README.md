# AllToOne

第一次写typescript，随便想了一个功能练练手。

本项目提供一个javascript模块，根据图片的颜色，利用多张图片拼成一张大图。本模块可使用AMD方式直接在浏览器加载运行。

整体实现的思路非常简单，通过计算图片的RGB通道平均值进行匹配。因此实现的效果一般，而且使用javascript处理图片的效率还是有点低。

使用方法：
1. 编译typescript，得到allToOne.js
2. 在自己的web前端中，使用requirejs加载allToOne.js
3. 获取canvas的dom节点，并新建一个Render对象
```javascript
let canvas = document.getElementById("canvas");
let myRender = new allToOne.Render(canvas);
```
4. 调用drawCombine方法绘图
```javascript
/**
 * 计算拼图并渲染到canvas上
 * @method
 * @param targetUrl - 要拼的图片的原图的URL
 * @param sourceUrlList - 用作拼图的小图片URL数组
 * @param divX - 横向分多少张图片
 * @param divY - 纵向分多少张图片
 * @param targetScale - 最终输出的图片与原图的比例，默认是1，即不缩放
 * @return promise - 返回一个promise，可以使用then来执行后续工作
 */
drawCombine(targetUrl,sourceUrlList,divX,divY,targetScale=1)
```

下面是Demo的演示效果，分别演示了4×4,8×8,16×16,32×32,64×64和128×128的生成效果。使用的素材出自画师QuAn(微博：\@\_\_QuAn\_，P站ID=6657532)
Demo代码也在项目中给出（不含素材图片）。

![](/demo.gif)
