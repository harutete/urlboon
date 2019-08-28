import '../sass/style.scss';

class jumpUrl {
    constructor () {
        this.config = {
            setElm: {
                body: window.document.body
            },
            setAttr: {
                wrap: 'jumpurl-wrap',
                textarea: 'box-url',
                modalButton: 'btn-modal',
                getUrlButton: 'btn-geturl',
                active: 'active'
            }
        }
        this.win = window;
        this.doc = this.win.document;

        this.init()
    }
    init () {
        console.log(this.config.setElm.body);
    }
}
new jumpUrl();

(function (win, doc) {
    'use strict';

    let jumpUrl = {};

    jumpUrl.init = () => {
        const self = this;

        self.setElm = {
            body: doc.body
        };
        self.setAttr = {
            wrap: 'jumpurl-wrap',
            textarea: 'box-url',
            modalButton: 'btn-modal',
            getUrlButton: 'btn-geturl',
            active: 'active'
        };

        self.setPanel();
        self.setTogglePanel();
        self.getUrlPage();
    };
    jumpUrl.setPanel = () => {
        const wrap = doc.createElement('div');
        const textarea = doc.createElement('textarea');
        const modalButton = doc.createElement('button');
        const getUrlButton = doc.createElement('button');

        wrap.classList.add(jumpUrl.setAttr.wrap);
        wrap.appendChild(textarea);
        wrap.appendChild(modalButton);
        wrap.appendChild(getUrlButton);
        textarea.setAttribute('id', jumpUrl.setAttr.textarea);
        modalButton.setAttribute('type', 'button');
        modalButton.classList.add(jumpUrl.setAttr.modalButton);
        getUrlButton.setAttribute('type', 'button');
        getUrlButton.classList.add(jumpUrl.setAttr.getUrlButton);
        getUrlButton.insertAdjacentHTML('beforeend', 'GET!!');

        jumpUrl.setElm.body.insertAdjacentElement('beforeend', wrap);
    };
    jumpUrl.setTogglePanel = () => {
        const button = doc.querySelector(`.${jumpUrl.setAttr.modalButton}`);
        const wrap = doc.querySelector(`.${jumpUrl.setAttr.wrap}`);
        let togglePanel = () => {
            if (!wrap.classList.contains(jumpUrl.setAttr.active)) {
                wrap.classList.add(jumpUrl.setAttr.active);
            } else {
                wrap.classList.remove(jumpUrl.setAttr.active);
            }
        };

        button.addEventListener('click', togglePanel, false);
    },
    jumpUrl.getUrlPage = () => {
        let textVal;
        const box = doc.getElementById(jumpUrl.setAttr.textarea);
        const searchStr = new RegExp('http(s)://', 'ig');
        const accessPage = () => {
            let urlArr;
            let i;
            let len;

            textVal = box.value;

            if (textVal === '') {
                win.alert('URLを入力してください');

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

        doc.querySelector(`.${jumpUrl.setAttr.getUrlButton}`).addEventListener('click', accessPage, false);
    };

    doc.addEventListener('DOMContentLoaded', () => {
        jumpUrl.init();
    }, false);
}(window, window.document));
