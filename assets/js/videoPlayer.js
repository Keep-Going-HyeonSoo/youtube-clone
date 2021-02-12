/* eslint-disable no-use-before-define */
const videoPlayer = document.getElementById('jsVideoPlayer')
const video = document.querySelector('#jsVideoPlayer video')
const playBtn = document.getElementById('jsPlayButton')
const volumeBtn = document.getElementById('jsVolumeBtn')
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
  if (video.muted) {
    video.muted = false
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  }
  else {
    video.muted = true
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

const init = () => {
  playBtn.addEventListener('click', handlePlayClick)
  video.addEventListener('click', handlePlayClick)
  volumeBtn.addEventListener('click', handleVolumeClick)
  fullScrnBtn.addEventListener('click', goFullScreen)
  video.addEventListener('loadedmetadata', setTotalTime) // 없어도 되는것 같은데 혹시 모르니까..
  video.addEventListener('timeupdate', getCurrentTime) // timeupdate event : Fired when the time indicated by the currentTime attribute has been updated.
  video.addEventListener('ended', handleVideoEnded)
}

if (videoPlayer) {
  init()
  setTimeout(setTotalTime, 100) // 0.1 초 뒤에 실행
}
