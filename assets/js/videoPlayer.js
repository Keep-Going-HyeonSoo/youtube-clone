/* eslint-disable no-use-before-define */
const videoPlayer = document.getElementById('jsVideoPlayer')
const video = document.querySelector('#jsVideoPlayer video')
const playBtn = document.getElementById('jsPlayButton')
const volumeBtn = document.getElementById('jsVolumeBtn')
const volumeBar = document.getElementById('jsVolumeBar')
const fullScrnBtn = document.getElementById('jsFullScreen')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const blinkIcon = document.getElementById('jsBlinkIcon')

function handlePlayClick() {
  if (video.paused) {
    video.play()
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'

    blinkPlayIcon()
  }
  else {
    video.pause()
    playBtn.innerHTML = '<i class="fas fa-play"></i>'

    blinkPauseIcon()
  }
}

function handleVolumeClick() {
  if (video.muted) { // 음소거 해제
    video.muted = false
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    volumeBar.value = video.volume
  }
  else { // 음소거 실행
    volumeBar.value = 0
    video.muted = true
    // console.log(video.volume) // muted 를 시켜도 video.volume 값은 0 이 아님 ( 음소거 전 기존볼륨값이 그대로 살아있음 )
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  }
}

function goSmallScreen() {
  document.exitFullscreen()
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>'
  fullScrnBtn.removeEventListener('click', goSmallScreen)
  fullScrnBtn.addEventListener('click', goFullScreen)
}

function goFullScreen() {
  videoPlayer.requestFullscreen()
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>'
  fullScrnBtn.removeEventListener('click', goFullScreen)
  fullScrnBtn.addEventListener('click', goSmallScreen)
}

const formatTime = (videoLength) => {
  const videoLengthNumber = parseInt(videoLength, 10)
  let hours = Math.floor(videoLengthNumber / 3600)
  let minutes = Math.floor((videoLengthNumber - hours * 3600) / 60)
  let seconds = videoLengthNumber - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${hours}:${minutes}:${seconds}`
}

function getCurrentTime() { // video 가 play 된 시간을 렌더링하는 함수 ( timeupdate 이벤트의 리스너로 실행)
  currentTime.innerHTML = formatTime(video.currentTime)
}

function setTotalTime() { // video 의 전체 러닝타임을 렌더링하는 함수
  totalTime.innerHTML = formatTime(video.duration)
}

function handleVideoEnded() {
  incViewCount() // 조회수 증가
  playBtn.innerHTML = '<i class="fas fa-redo"></i>'
  playBtn.addEventListener('click', handleReplay)

  // 다시 시작하는 아이콘 나타내주기
  blinkIcon.innerHTML = '<i class="fas fa-redo"></i>'
  blinkIcon.style.fontSize = '8vw'
  blinkIcon.style.opacity = '1'

  blinkIcon.addEventListener('click', handleReplay)
}

function handleReplay() {
  removeBlinkIcon()
  playBtn.removeEventListener('click', handleReplay)
  video.currentTime = 0
  video.play()
  playBtn.innerHTML = '<i class="fas fa-pause"></i>'
}

// 재생 아이콘 깜빡거리기
function blinkPlayIcon() {
  blinkIcon.innerHTML = '<i class="far fa-play-circle"></i>'
  blinkIcon.style.fontSize = '8vw'
  blinkIcon.style.opacity = '0.8'
  removeBlinkIcon()
}

// 일시정지 아이콘 깜빡거리기
function blinkPauseIcon() {
  blinkIcon.innerHTML = '<i class="far fa-pause-circle"></i>'
  blinkIcon.style.fontSize = '8vw'
  blinkIcon.style.opacity = '0.8'
  removeBlinkIcon()
}

function removeBlinkIcon() {
  setTimeout(() => {
    blinkIcon.style.fontSize = '5vw'
    blinkIcon.style.opacity = '0'
  }, 400)
}

function showVolumeBar() {
  volumeBar.style.opacity = 1
}

function hideVolumeBar() {
  volumeBar.style.opacity = 0
}

function handleDrag(event) {
  const { target: { value } } = event // user 가 drag한 volume 값이 value
  video.volume = value // video 의 volume 을 input 값을 변경
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  }
  else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
  }
  else if (value > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>'
  }
  else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  }
}

// API 호출 함수

function incViewCount() {
  const videoId = window.location.href.split('/videos/')[1]
  fetch(`/api/${videoId}/view`, { method: 'POST' })
  // fetch 는 비동기적으로 Promise 를 리턴하지만, 결과값을 이용한 로직이 필요한 것은 아니므로 await 을 할 필요는 없다.
}

const init = () => {
  video.volume = 0.5
  incViewCount() // 조회수 증가
  playBtn.addEventListener('click', handlePlayClick)
  video.addEventListener('click', handlePlayClick)
  volumeBtn.addEventListener('click', handleVolumeClick)
  volumeBtn.addEventListener('mouseover', showVolumeBar)
  volumeBtn.addEventListener('mouseleave', hideVolumeBar)
  volumeBar.addEventListener('mouseover', showVolumeBar)
  volumeBar.addEventListener('mouseleave', hideVolumeBar)
  volumeBar.addEventListener('input', handleDrag)
  fullScrnBtn.addEventListener('click', goFullScreen)
  video.addEventListener('loadedmetadata', setTotalTime) // 없어도 되는것 같은데 혹시 모르니까..
  video.addEventListener('timeupdate', getCurrentTime) // timeupdate event : Fired when the time indicated by the currentTime attribute has been updated.
  video.addEventListener('ended', handleVideoEnded)
}

if (videoPlayer) {
  init()
  setTimeout(setTotalTime, 100) // 0.1 초 뒤에 실행
}
