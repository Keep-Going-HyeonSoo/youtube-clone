import axios from 'axios'
import moment from 'moment-timezone'

const addCommentForm = document.getElementById('jsAddComment')
const commentList = document.getElementById('jsCommentList')

const increaseNumber = () => {
  const number = document.getElementById('jsCommentNumber')
  number.innerHTML = parseInt(number.innerHTML, 10) + 1
}

const addComment = (comment, profile) => {
  const li = document.createElement('li')

  const img = document.createElement('img')
  img.classList.add('comments-profile')
  img.src = profile.avatarUrl
  li.appendChild(img)

  const span1 = document.createElement('span')
  span1.classList.add('comments-name')
  span1.innerHTML = profile.name
  li.appendChild(span1)

  const span2 = document.createElement('span')
  span2.classList.add('comments-text')
  span2.innerHTML = comment
  li.appendChild(span2)

  const span3 = document.createElement('span')
  span3.classList.add('comments-date')
  const dateSeoul = moment(Date.now()).format()
  span3.innerHTML = `${dateSeoul.split('T')[0]} ${dateSeoul.split('T')[1].substring(0, 5)}`
  li.appendChild(span3)

  commentList.insertBefore(li, commentList.firstChild)
  increaseNumber()
}

// axios 를 이용한 AJAX 비동기 요청 ( 댓글 추가 )
const sendComment = async (comment) => {
  const videoID = window.location.href.split('/videos/')[1]
  const commentPromise = axios.post(`/api/${videoID}/comment`, {
    comment // comment : comment
  })
  const userPromise = axios.get('/api/profile')
  Promise.all([commentPromise, userPromise]).then((response) => {
    console.log(response)
    if (response[0].status === 200 && response[1].status === 200) {
      addComment(comment, response[1].data)
    }
  })

  // const response = await axios.post(`/api/${videoID}/comment`, {
  //   comment // comment : comment
  // })
  // if (response.status === 200) {
  //   addComment(comment)
  // }
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
