import axios from 'axios'

const addCommentForm = document.getElementById('jsAddComment')

// axios 를 이용한 AJAX 비동기 요청 ( 댓글 추가 )
const sendComment = async (comment) => {
  const videoID = window.location.href.split('/videos/')[1]
  const response = await axios.post(`/api/${videoID}/comment`, {
    comment // comment : comment
  })
  console.log(response)
}

const handleSubmit = (event) => {
  event.preventDefault()
  const comment = addCommentForm.querySelector('input').value
  sendComment(comment)
  addCommentForm.querySelector('input').value = ''
}

function init() {
  addCommentForm.addEventListener('submit', handleSubmit)
}

if (addCommentForm) {
  init()
}
