require(["allToOne"], function (allToOne) {

    // 目标图片的URL
    const target = "./img/20.webp";
    // 素材图片的URL列表，图片请自行准备
    const sourceList = [];
    for (let i = 0; i < 100; i++) {
        let fileName = "./img/" + i + ".webp";
        sourceList.push(fileName);
    }

    // 显示目标图片的原图
    let canvas0 = document.getElementById("canvas0");
    let myRender0 = new allToOne.Render(canvas0);
    // myRender0.drawGray(target);
    myRender0.draw(target);

    // 初始化dom
    const btn = document.getElementById("buildBtn");
    const wIn = document.getElementById("widthInput");
    const hIn = document.getElementById("heightInput");
    wIn.value = 64;
    wIn.disabled = "";
    hIn.value = 64;
    hIn.disabled = "";
    btn.innerText = "生成拼图";
    btn.disabled = "";


    // 点击生成的方法
    function clickFunc() {
        btn.disabled = "disabled";
        wIn.disabled = "disabled";
        hIn.disabled = "disabled";
        btn.innerText = "生成中。。。";
        // 生成并显示拼图
        let canvas1 = document.getElementById("canvas1");
        let myRender1 = new allToOne.Render(canvas1);
        let startTime1 = new Date().getTime();
        myRender1.drawCombine(target, sourceList, wIn.value, hIn.value, 10).then(function () {
            console.log("cost:", new Date().getTime() - startTime1, "ms");
            btn.disabled = "";
            wIn.disabled = "";
            hIn.disabled = "";
            btn.innerText = "生成拼图";
        });
    }

    btn.onclick = clickFunc;

    clickFunc();

});