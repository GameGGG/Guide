# Guide
网页步骤引导


```
    // html
    <div id="test" style="width: 100px; height: 50px; background: red;"></div>
    <div id="test2" style="position: absolute; top: 400px; left: 300px; width: 100px; height: 50px; background: blue;"></div>
    <div id="test3" style="position: absolute; top: 200px; left: 600px; width: 100px; height: 50px; background: yellow;"></div>
    <div id="test4" style="position: absolute; top: 200px; left: 900px; width: 100px; height: 50px; background: green;"></div>
    <input id="test5" type="text" style="position: absolute; top: 124px; left: 300px; width: 200px; height: 30px; border: 1px solid #eee; outline: none;" />


    //js
    var MyGuild = Guide({
        steps: [
            document.querySelector('#test5'),
            document.querySelector('#test'),
            document.querySelector('#test2'),
            document.querySelector('#test3'),
            document.querySelector('#test4')
        ],
        messages: [
            '第一步：输入框',
            '第二步：红色',
            '第三步：蓝色',
            '第四步：黄色',
            '第五步：绿色'
        ]
    });
    MyGuild.beginStep();
