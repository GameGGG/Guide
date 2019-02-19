;(function(win, doc) {
    function Guide(opt) {
        this.mask = null;
        this.opacityRect = null;
        this.cw = 0;
        this.ch = 0;
        this.step = 0;
        this.init(opt);
    }
    Guide.prototype.init = function(opt) {
        this.steps = opt.steps || [];
        this.messages = opt.messages || [];
        this.createMask();
        this.createOpcityRect();
        this.createGuideInfo();
        this.nextStep();
    }
    Guide.prototype.beginStep = function() {
        // 打开mask;
        this.setStyle(this.mask, {display: 'block'});
    }
    Guide.prototype.getShowDomInfo = function(dom) {
        return dom.getBoundingClientRect();
    }
    Guide.prototype.nextStep = function() {
        if (this.step >= this.steps.length) {
            this.removeMask();
            return;
        }
        var activeDomInfo = this.getShowDomInfo(this.steps[this.step]);
        this.setOpcityRect(activeDomInfo);
        this.setGuideInfo(activeDomInfo);

        this.step++;
    }
    Guide.prototype.removeMask = function() {
        doc.querySelector('body').removeChild(this.mask);
    }
    Guide.prototype.createMask = function() {
        // 创建一个和窗口相同大小的蒙板
        var bodyDom = doc.querySelector('body');
        var maskDom = doc.createElement('div');
        this.cw = bodyDom.clientWidth;
        this.ch = bodyDom.clientHeight;
        this.setStyle(maskDom, {
            position: "fixed",
            top: "0px",
            left: "0px",
            width: `${bodyDom.clientWidth}px`,
            height: `${bodyDom.clientHeight}px`,
            display: 'none'
        });
        bodyDom.appendChild(maskDom);
        var me = this;
        maskDom.addEventListener('click', function() {
            me.nextStep();
        });
        this.mask = maskDom;
    }
    Guide.prototype.setStyle = function(dom, styles) {
        for (var i in styles) {
            dom.style[i] = styles[i];
        }
    }
    Guide.prototype.createGuideInfo = function() {
        // 引导面板
        var guidInfo = doc.createElement('div');
        this.setStyle(guidInfo, {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '0px',
            height: '0px'
        });
        this.mask.appendChild(guidInfo);
        this.guidInfo = guidInfo;
    }
    Guide.prototype.setGuideInfo = function(opt) {
        var height = 100;
        var width = 200;
        var styles = {
            width: width + 'px',
            height: height + 'px',
            background: '#ffffff'
        };
        if (opt.top > this.ch / 2) {
            styles.top = opt.top - height + opt.height + 5 + 'px';
        }
        else {
            styles.top = opt.top - 5 + 'px';
        }

        if (opt.left > this.cw / 2) {
            styles.left = opt.left - width - 10 + 'px';
        }
        else {
            styles.left = opt.left + opt.width + 10 + 'px';
        }
        this.guidInfo.innerHTML = '<p style="text-indent: 10px;">'+ this.messages[this.step] +'</p>'
        this.setStyle(this.guidInfo, styles);
    }
    Guide.prototype.createOpcityRect = function(opt) {
        var opacityRect = doc.createElement('div');
        this.setStyle(opacityRect, {
            position: "absolute",
            background: "rgba(0, 0, 0, 0)",
            boxShadow: "0px 0px 1px 999999px rgba(0, 0, 0, 0.7)",
            top: '0px',
            left: '0px',
            width: '0px',
            height: '0px',
            pointerEvents: 'none'
        });
        this.mask.appendChild(opacityRect);
        this.opcityRect = opacityRect;
    }
    Guide.prototype.setOpcityRect = function(opt) {
        this.setStyle(this.opcityRect, {
            top: opt.top - 5 + 'px',
            left: opt.left - 5 + 'px',
            width: opt.width + 10 + 'px',
            height: opt.height + 10 + 'px'
        });
    }
    if (win.Guide) {
        console.warn('Guide变量被占用');
        return;
    }
    window.Guide = function(opt) {
        return new Guide(opt);
    }
})(window, document);
