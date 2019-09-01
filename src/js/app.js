import '../sass/style.scss';

class jumpUrl {
    constructor () {
        this.win = window;
        this.doc = this.win.document;
        this.config = {
            setElm: {
                body: this.doc.body
            },
            setAttr: {
                wrap: 'jumpurl-wrap',
                textarea: 'box-url',
                modalButton: 'btn-modal',
                getUrlButton: 'btn-geturl',
                active: 'active'
            }
        }

        this.setPanel()
        this.setTogglePanel()
        this.getUrlPage()
    }
    setPanel () {
        const wrap = this.doc.createElement('div');
        const textarea = this.doc.createElement('textarea');
        const modalButton = this.doc.createElement('button');
        const getUrlButton = this.doc.createElement('button');

        wrap.classList.add(this.config.setAttr.wrap);
        wrap.appendChild(textarea);
        wrap.appendChild(modalButton);
        wrap.appendChild(getUrlButton);
        textarea.setAttribute('id', this.config.setAttr.textarea);
        modalButton.setAttribute('type', 'button');
        modalButton.classList.add(this.config.setAttr.modalButton);
        getUrlButton.setAttribute('type', 'button');
        getUrlButton.classList.add(this.config.setAttr.getUrlButton);
        getUrlButton.insertAdjacentHTML('beforeend', 'GET!!');

        this.config.setElm.body.insertAdjacentElement('beforeend', wrap);
    }
    setTogglePanel () {
        const button = this.doc.querySelector(`.${this.config.setAttr.modalButton}`);
        const wrap = this.doc.querySelector(`.${this.config.setAttr.wrap}`);
        let togglePanel = () => {
            if (!wrap.classList.contains(this.config.setAttr.active)) {
                wrap.classList.add(this.config.setAttr.active);
            } else {
                wrap.classList.remove(this.config.setAttr.active);
            }
        };

        button.addEventListener('click', togglePanel, false);
    }
    getUrlPage  () {
        let textVal;
        const box = this.doc.getElementById(this.config.setAttr.textarea);
        const searchStr = new RegExp('http(s)://', 'ig');
        const accessPage = () => {
            let urlArr;
            let i;
            let len;

            textVal = box.value;

            if (textVal === '') {
                this.win.alert('URLを入力してください');

                return;
            }

            urlArr = textVal.split(/\r\n|\n/);
            len = urlArr.length;

            for (i = 0; i < len; i++) {
                if (searchStr.test(urlArr[i])) {
                    this.win.open(urlArr[i]);
                } else {
                    continue;
                }

                searchStr.lastIndex = 0;
            }
        };
        this.doc.querySelector(`.${this.config.setAttr.getUrlButton}`).addEventListener('click', accessPage, false);
    }
}

new jumpUrl();
