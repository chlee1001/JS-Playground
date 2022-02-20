;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)

  class Stopwatch {
    constructor (element) {
      this.timer = element
      this.interval = null
      this.defaultTIme = '00:00.00'
      this.startTime = 0
      this.elapsedTime = 0
    }

    addZero (number) {
      if (number < 10) {
        return '0' + number
      }
      if (number > 99) {
        return number.toString().slice(0, -1)
      }
      return number
    }

    timeToString (time) {
      const date = new Date(time)
      const minutes = date.getUTCMinutes()
      const seconds = date.getUTCSeconds()
      const milliseconds = date.getUTCMilliseconds()
      return `${this.addZero(minutes)}:${this.addZero(seconds)}.${this.addZero(
        milliseconds)}`
    }

    print (text) {
      this.timer.innerHTML = text
    }

    startTimer () {
      this.elapsedTime = Date.now() - this.startTime
      const time = this.timeToString(this.elapsedTime)
      this.print(time)
    }

    start () {
      clearInterval(this.interval)
      this.startTime = Date.now() - this.elapsedTime
      this.interval = setInterval(this.startTimer.bind(this), 10)
    }

    stop () {
      clearInterval((this.interval))
    }

    reset () {}
  }

  const $startButton = get('.timer_button.start')
  const $stopButton = get('.timer_button.stop')
  const $timer = get('.timer')
  const stopwatch = new Stopwatch($timer)

  $startButton.addEventListener('click', () => {
    stopwatch.start()
  })

  $stopButton.addEventListener('click', () => {
    stopwatch.stop()
  })
})()
