(function (win, doc) {
    'use strict';

    var jumpUrl = {};

    jumpUrl.init = function () {
        var self = this;

        self.KEYCODE = {
            TAB: 9,
            KEY01: 49
        };
        self.setElm = {
            body: doc.body
        };
        self.setAttr = {
            wrap: 'jumpurl-wrap',
            textarea: 'box-url',
            button: 'btn-geturl'
        };

        self.setPanel();
        self.getUrlPage();
    };
    jumpUrl.setPanel = function () {
        var wrap = doc.createElement('div');
        var textarea = doc.createElement('textarea');
        var button = doc.createElement('button');
        var head = doc.head;
        var style = doc.createElement('style');
        var styleCode = doc.createTextNode('.jumpurl-wrap { position: fixed; top: 30px; left: 0; right: 0; text-align: center; width: 500px; margin: auto; } .jumpurl-wrap *, .jumpurl-wrap *::before, .jumpurl-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; } .jumpurl-wrap #box-url { display: block; width: 100%; max-width: 100%; min-height: 150px; } .jumpurl-wrap .btn-geturl { cursor: pointer; display: inline-block; border: none; border-radius: 3px; margin-top: 20px; padding: 10px 15px; }');

        wrap.classList.add(jumpUrl.setAttr.wrap);
        wrap.appendChild(textarea);
        wrap.appendChild(button);
        textarea.setAttribute('id', jumpUrl.setAttr.textarea);
        button.setAttribute('type', 'button');
        button.classList.add(jumpUrl.setAttr.button);
        button.insertAdjacentHTML('beforeend', 'GET!!');
        style.media = 'screen';
        style.type = 'text/css';
        style.appendChild(styleCode);

        head.appendChild(style);
        jumpUrl.setElm.body.insertAdjacentElement('beforeend', wrap);
    };
    jumpUrl.getUrlPage = function () {
        var box = doc.getElementById(jumpUrl.setAttr.textarea);
        var textVal;
        var searchStr = new RegExp('http(s)://', 'ig');
        var accessPage = function () {
            var urlArr;
            var i;
            var len;

            textVal = box.value;

            if (textVal === '') {
                return;
            }

            urlArr = textVal.split(/\r\n|\n/);
            len = urlArr.length;

            for (i = 0; i < len; i++) {
                if (searchStr.test(urlArr[i])) {
                    win.open(urlArr[i]);
                } else {
                    continue;
                }

                searchStr.lastIndex = 0;
            }
        };

        doc.querySelector('.' + jumpUrl.setAttr.button).addEventListener('click', accessPage, false);
    };

    doc.addEventListener('DOMContentLoaded', function () {
        jumpUrl.init();
    }, false);
}(window, window.document));
