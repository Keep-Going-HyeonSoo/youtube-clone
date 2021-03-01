const hamburger = document.getElementById('jsHamburger')
const headerWrapper = document.querySelector('.header__wrapper')
const headerCOL = document.querySelectorAll('.header__col')

const handleToggle = () => {
  headerCOL.forEach((element) => {
    element.classList.toggle('show')
  })
  headerWrapper.classList.toggle('show')
}

const init = () => {
  hamburger.addEventListener('click', handleToggle)
}

if (hamburger) {
  init()
}
