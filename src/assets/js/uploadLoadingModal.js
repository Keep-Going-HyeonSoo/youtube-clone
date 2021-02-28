const submitBtn = document.getElementById('jsSubmit')
const modal = document.querySelector('.modal')

const handleModal = () => {
  modal.classList.remove('hidden')
}

const init = () => {
  submitBtn.addEventListener('click', handleModal)
}

if (submitBtn) {
  init()
}
