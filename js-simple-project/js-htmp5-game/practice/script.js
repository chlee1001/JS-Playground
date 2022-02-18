;(function () {
  'use strict'

  const get = target => document.querySelector(target)

  const $canvas = get('.canvas')
  const ctx = $canvas.getContext('2d')

  const $score = get('.score')
  const $highScore = get('.highScore')
  const $play = get('.js-play')

  const colorSet = {
    board: 'rgb(20, 105, 38)',
    snakeHead: 'rgba(229, 65, 120, 0.929)',
    snakeBody: 'rgba(153, 206, 244, 0.498)',
    food: 'rgb(66, 187, 103)',
  }

  let start = 0
  let option = {
    highScore: localStorage.getItem('score') || 0,
    gameEnd: true,
    direction: 2,
    snake: [
      { x: 10, y: 10, direction: 2 },
      { x: 10, y: 20, direction: 2 },
      { x: 10, y: 30, direction: 2 },
    ],
    food: { x: 0, y: 0 },
    score: 0,
  }

  const buildBoard = () => {
    ctx.fillStyle = colorSet.board
    ctx.fillRect(0, 0, 300, 300)
  }

  const buildSnake = (ctx, x, y, head = false) => {
    ctx.fillStyle = head ? colorSet.snakeHead : colorSet.snakeBody
    ctx.fillRect(x, y, 10, 10)
  }

  const buildFood = (ctx, x, y) => {
    ctx.beginPath()
    ctx.fillStyle = colorSet.food
    ctx.arc(x + 5, y + 5, 5, 0, 2 * Math.PI)
    ctx.fill()
  }

  const setSnake = () => {
    for (let i = option.snake.length - 1; i >= 0; --i) {
      buildSnake(ctx, option.snake[i].x, option.snake[i].y, i === 0)
    }
  }

  const play = (timestamp) => {
    start++
    if (option.gameEnd) {
      return
    }
    if (timestamp - start > 1000 / 10) {
      buildBoard()
      buildFood(ctx, option.food.x, option.food.y)
      setSnake()
      start = timestamp
    }
    window.requestAnimationFrame(play)
    // if (isGameOver()) {
    //   option.gameEnd = true
    //   setHighScore()
    //   alert('게임오버!')
    //   return
    // }

  }

  const init = () => {
    // document.addEventListener('keydown', event => {
    //   if (!/Arrow/gi.test(event.key)) {
    //     return
    //   }
    //   event.preventDefault()
    //   const direction = getDirection(event.key)
    //   if (!isDirectionCorrect(direction)) {
    //     return
    //   }
    //   option.direction = direction
    // })
    $play.onclick = () => {
      if (option.gameEnd) {
        option = {
          highScore: localStorage.getItem('score') || 0,
          gameEnd: false,
          direction: 2,
          snake: [
            { x: 10, y: 10, direction: 2 },
            { x: 10, y: 20, direction: 2 },
            { x: 10, y: 30, direction: 2 },
          ],
          food: { x: 0, y: 0 },
          score: 0,
        }
        $score.innerHTML = `점수 : 0점`
        $highScore.innerHTML = `최고점수 : ${option.highScore}점`
        // randomFood();
        window.requestAnimationFrame(play)
      }
    }
  }

  init()
})()
