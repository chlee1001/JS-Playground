;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)
  const getAll = (target) => document.querySelectorAll(target)

  const $search = get('#search')
  const $list = getAll('.contents.list figure')
  const $searchButton = get('.btn_search')

  const $player = get('.view video')
  const $btnPlay = get('.js-play')
  const $btnRePlay = get('.js-replay')
  const $btnStop = get('.js-stop')
  const $btnMute = get('.js-mute')
  const $progress = get('.js-progress')
  const $volume = get('.js-volume')
  const $fullscreen = get('.js-fullScreen')

  const search = () => {
    let searchText = $search.value.toLowerCase()

    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('strong')
      const text = $target.textContent.toLowerCase()
      if (-1 < text.indexOf(searchText)) {
        $list[index].style.display = 'flex'
      } else {
        $list[index].style.display = 'none'
      }
    }
  }

  const onMouseOver = (e) => {
    const webPlay = e.target.parentNode.querySelector('source')
    webPlay.setAttribute('srcset', './assets/sample.webp')
  }

  const onMouseOut = (e) => {
    const webPlay = e.target.parentNode.querySelector('source')
    webPlay.setAttribute('srcset', './assets/sample.jpg')
  }

  const getViewPage = () => {
    const viewTitle = get('.view strong')
    viewTitle.innerText = decodeURI(window.location.hash.split('&')[1])

    get('.list').style.display = 'none'
    get('.view').style.display = 'flex'

  }
  const getListPage = () => {
    get('.view').style.display = 'none'
    get('.list').style.display = 'flex'
  }

  const hashChange = (e) => {
    e.preventDefault()
    const parentNode = e.target.closest('figure')
    const viewTitle = parentNode.querySelector('strong').textContent
    window.location.hash = `view${viewTitle}`
    getViewPage()
  }

  const setProgress = () => {
    $progress.value = Math.floor(100 / $player.duration) * $player.currentTime

  }
  const buttonChange = (btn, value) => {
    btn.innerHTML = value
  }

  const getCurrent = (e) => {
    let percent = e.offsetX / $progress.offsetWidth
    $player.currentTime = percent * $player.duration
    e.target.value = Math.floor(percent / 100)
  }

  const playVideo = () => {
    if ($player.paused || $player.ended) {
      buttonChange($btnPlay, 'pause')
      $player.play()
    } else {
      buttonChange($btnPlay, 'play')
      $player.pause()
    }
  }

  const stopVideo = () => {
    $player.pause()
    $player.currentTime = 0
    buttonChange($btnPlay, 'play')
  }

  const resetPlayer = () => {
    $progress.value = 0
    $player.currentTime = 0
    buttonChange($btnPlay, 'play')
  }

  const replayVideo = () => {
    resetPlayer()
    $player.play()
    buttonChange($btnPlay, 'pause')
  }

  const mute = () => {
    if ($player.muted) {
      buttonChange($btnMute, 'mute')
      $player.muted = false
    } else {
      buttonChange($btnMute, 'unmute')
      $player.muted = true
    }
  }

  const fullScreen = () => {
    if ($player.requestFullscreen) {
      if (document.fullscreenElement) {
        document.cancelFullScreen()
      } else {
        $player.requestFullscreen()
      }
    }
  }

  const viewPageEvent = () => {
    $volume.addEventListener('change', e => {
      $player.volume = e.target.value
    })

    $player.addEventListener('timeupdate', setProgress)
    $player.addEventListener('play', buttonChange($btnPlay, 'pause'))
    $player.addEventListener('pause', buttonChange($btnPlay, 'play'))
    $player.addEventListener('volumechange', () => {
      $player.muted
        ? buttonChange($btnMute, 'unmute')
        : buttonChange($btnMute, 'mute')
    })
    $player.addEventListener('ended', $player.pause())
    $progress.addEventListener('click', getCurrent)
    $btnPlay.addEventListener('click', playVideo)
    $btnStop.addEventListener('click', stopVideo)
    $btnRePlay.addEventListener('click', replayVideo)
    $btnMute.addEventListener('click', mute)
    $fullscreen.addEventListener('click', fullScreen)
  }

  const init = () => {
    $search.addEventListener('keyup', search)
    $searchButton.addEventListener('click', search)

    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('picture')
      $target.addEventListener('mouseover', onMouseOver)
      $target.addEventListener('mouseout', onMouseOut)
    }
    for (let index = 0; index < $list.length; index++) {
      $list[index].addEventListener('click', hashChange)
    }

    window.addEventListener('hashchange', () => {
      const isView = -1 < window.location.hash.indexOf('view')
      if (isView) {
        getViewPage()
      } else {
        getListPage()
      }
    })

    viewPageEvent()
  }

  init()

})()
