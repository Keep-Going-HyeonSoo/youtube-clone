const videoPlayer = document.getElementById('jsVideoPlayer')
const video = videoPlayer.querySelector('video')
const playBtn = document.getElementById('jsPlayButton')
const volumeBtn = document.getElementById('jsVolumeBtn')
const fullScrnBtn = document.getElementById('jsFullScreen')

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
  fullScrnBtn.addEventListener('click', goFullScreen)
}

function goFullScreen() {
  videoPlayer.requestFullscreen()
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>'
  fullScrnBtn.removeEventListener('click', goFullScreen)
  fullScrnBtn.addEventListener('click', goSmallScreen)
}

const init = () => {
  playBtn.addEventListener('click', handlePlayClick)
  volumeBtn.addEventListener('click', handleVolumeClick)
  fullScrnBtn.addEventListener('click', goFullScreen)
}

if (videoPlayer) {
  init()
}
