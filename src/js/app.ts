import '../sass/style.scss'

class TransitionPage {
  private readonly _win: Window
  private readonly _doc: HTMLDocument
  constructor() {
    this._win = window
    this._doc = this._win.document
  }
  public init(): void {
    let btnSlidePanel: HTMLButtonElement
    let btnTransition: HTMLButtonElement
    this.setPanel()

    btnSlidePanel = this._doc.querySelector('.js-btn-toggle-menu')
    btnTransition = this._doc.querySelector('.js-btn-transition')
    btnSlidePanel.addEventListener('click', () => {
      this.toggleSlideMenu()
    })
    btnTransition.addEventListener('click', () => {
      this.openNewTabAndTransition()
    })
  }
  private setPanel(): void {
    const body = this._doc.body
    const panelElms: string = '<div class="js-content-transition-page content-transition-page">\n\
      <button type="button" class="js-btn-toggle-menu btn-toggle-menu"></button>\n\
      <div class="content-transition-page__inner">\n\
        <textarea class="js-textarea-input textarea-input"></textarea>\n\
        <button type="button" class="js-btn-transition btn-transition">Access</button>\n\
      </div>\n\
    </div>'
    body.insertAdjacentHTML('afterbegin', panelElms)
  }
  private toggleSlideMenu(): void {
    const wrap = this._doc.querySelector('.js-content-transition-page')
    const activeClass = 'is-active'

    if (wrap.classList.contains(activeClass)) {
      wrap.classList.remove(activeClass)
    } else {
      wrap.classList.add(activeClass)
    }
  }
  private openNewTabAndTransition(): void {
    const textArea: HTMLTextAreaElement = this._doc.querySelector('.js-textarea-input')
    const limit = 5 // 一度に開けるタブの上限数
    const value = textArea.value
    const searchStr = new RegExp('http(s)://', 'ig')

    if (value === '') {
      this._win.alert('URLを入力してください')

      return
    }

    const urlStrArr = value.split(/\r\n|\n/)

    if (urlStrArr.length > limit) {
      this._win.alert(`入力できるURLは${limit}個までです`)

      return
    }

    urlStrArr.forEach(item => {
      if (searchStr.test(item)) {
        this._win.open(item)
      } else {
        return
      }

      searchStr.lastIndex = 0
    })
  }
}

new TransitionPage().init()
