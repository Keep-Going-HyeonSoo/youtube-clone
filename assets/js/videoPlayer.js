/* eslint-disable no-use-before-define */
const videoPlayer = document.getElementById('jsVideoPlayer')
const video = document.querySelector('#jsVideoPlayer video')
const playBtn = document.getElementById('jsPlayButton')
const volumeBtn = document.getElementById('jsVolumeBtn')
const fullScrnBtn = document.getElementById('jsFullScreen')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')

function handlePlayClick() {
  if (video.paused) {
    video.play()
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
  }
  else {
    video.pause()
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
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

const init = () => {
  playBtn.addEventListener('click', handlePlayClick)
  volumeBtn.addEventListener('click', handleVolumeClick)
  fullScrnBtn.addEventListener('click', goFullScreen)
  // video.addEventListener('loadedmetadata', setTotalTime) 없어도 되는듯
  video.addEventListener('timeupdate', getCurrentTime) // timeupdate event : Fired when the time indicated by the currentTime attribute has been updated.
}

if (videoPlayer) {
  init()
  setTimeout(setTotalTime, 100) // 0.1 초 뒤에 실행
}
