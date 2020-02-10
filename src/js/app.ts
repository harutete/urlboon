import '../sass/style.scss'

class JumpUrl {
  private readonly win: any
  private readonly doc: any
  private readonly setAttr: { [key: string]: string }
  constructor() {
    this.win = window
    this.doc = this.win.document
    this.setAttr = {
      wrap: 'jumpurl-wrap',
      textarea: 'box-url',
      modalButton: 'btn-modal',
      getUrlButton: 'btn-geturl',
      active: 'active'
    }
  }
  public init(): void {
    this.setPanel()
    this.setTogglePanel()
    this.getUrlPage()
  }
  private setPanel(): void {
    const body = this.doc.body
    const wrap = this.doc.createElement('div')
    const textarea = this.doc.createElement('textarea')
    const modalButton = this.doc.createElement('button')
    const getUrlButton = this.doc.createElement('button')
    wrap.classList.add(this.setAttr.wrap)
    wrap.appendChild(textarea)
    wrap.appendChild(modalButton)
    wrap.appendChild(getUrlButton)
    textarea.setAttribute('id', this.setAttr.textarea)
    modalButton.setAttribute('type', 'button')
    modalButton.classList.add(this.setAttr.modalButton)
    getUrlButton.setAttribute('type', 'button')
    getUrlButton.classList.add(this.setAttr.getUrlButton)
    getUrlButton.insertAdjacentHTML('beforeend', 'GET!!')
    body.insertAdjacentElement('beforeend', wrap)
  }
  private setTogglePanel(): void {
    const button = this.doc.querySelector(`.${this.setAttr.modalButton}`)
    const wrap = this.doc.querySelector(`.${this.setAttr.wrap}`)
    let togglePanel = () => {
      if (!wrap.classList.contains(this.setAttr.active)) {
        wrap.classList.add(this.setAttr.active)
      } else {
        wrap.classList.remove(this.setAttr.active)
      }
    }

    button.addEventListener('click', togglePanel, false)
  }
  private getUrlPage(): void {
    let textVal
    const box = this.doc.getElementById(this.setAttr.textarea)
    const searchStr = new RegExp('http(s)://', 'ig')
    const accessPage = (): void => {
      let urlArr
      let i
      let len
      textVal = box.value

      if (textVal === '') {
        this.win.alert('URLを入力してください')

        return
      }

      urlArr = textVal.split(/\r\n|\n/)
      len = urlArr.length
      for (i = 0; i < len; i++) {
        if (searchStr.test(urlArr[i])) {
          this.win.open(urlArr[i])
        } else {
          continue
        }

        searchStr.lastIndex = 0
      }
    }

    this.doc.querySelector(`.${this.setAttr.getUrlButton}`).addEventListener('click', accessPage, false)
  }
}

new JumpUrl().init()
