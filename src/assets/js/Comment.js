/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import moment from 'moment-timezone'

const addCommentForm = document.getElementById('jsAddComment')
const commentList = document.getElementById('jsCommentList')
const commentDeleteBtn = document.querySelectorAll('.jsCommentDeleteBtn')

const increaseNumber = () => {
  const number = document.getElementById('jsCommentNumber')
  number.innerHTML = parseInt(number.innerHTML, 10) + 1
}

const addComment = (comment, profile) => {
  const li = document.createElement('li')

  const input = document.createElement('input')
  input.type = 'hidden'
  input.value = comment._id
  li.appendChild(input)

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
  span2.innerHTML = comment.text
  li.appendChild(span2)

  const span3 = document.createElement('span')
  span3.classList.add('comments-date')
  const dateSeoul = moment(Date.now()).format()
  span3.innerHTML = `${dateSeoul.split('T')[0]} ${dateSeoul.split('T')[1].substring(0, 5)}`
  li.appendChild(span3)

  const span4 = document.createElement('span')
  span4.addEventListener('click', handleDelete)
  span4.classList.add('comments-delete', 'jsCommentDeleteBtn')
  const i = document.createElement('i')
  i.classList.add('far', 'fa-trash-alt')
  span4.appendChild(i)
  li.appendChild(span4)

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
    if (response[0].status === 200 && response[1].status === 200) {
      console.log(response[0], response[1])
      addComment(response[0].data, response[1].data)
    }
  })
}

const handleSubmit = (event) => {
  event.preventDefault()
  const comment = addCommentForm.querySelector('input').value
  sendComment(comment)
  addCommentForm.querySelector('input').value = ''
}

// 삭제 api AJAX 요청
const deleteComment = async (comment) => {
  const videoID = window.location.href.split('/videos/')[1]
  const response = await axios.post(`/api/${videoID}/comment/delete`, {
    cId: comment.querySelector('input').value
  })

  if (response.status === 200) {
    comment.remove()
    const number = document.getElementById('jsCommentNumber')
    number.innerHTML = parseInt(number.innerHTML, 10) - 1
  }
}

const handleDelete = (event) => {
  const selectedComment = event.target.parentNode.parentNode
  console.log(selectedComment)
  deleteComment(selectedComment)
}

function init() {
  addCommentForm.addEventListener('submit', handleSubmit)
  commentDeleteBtn.forEach((element) => {
    element.addEventListener('click', handleDelete)
  })

  // commentDeleteBtn.addEventListener('click', handleDelete)
}

if (addCommentForm) {
  init()
}
