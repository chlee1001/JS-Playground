;(function () {
  'use strict'
  const get = (target) => document.querySelector(target)

  const $button = get('.modal_open_button')
  const $modal = get('.modal')
  const $body = get('body')
  const $modalCancelButton = get('.modal_button.cancel')
  const $modalConfirmButton = get('.modal_button.confirm')

  const toggleModal = () => {
    $modal.classList.toggle('show')
    $body.classList.toggle('scroll_lock')
  }

  $button.addEventListener('click', () => {
    toggleModal()
  })

  $modalCancelButton.addEventListener('click', () => {
    toggleModal()
    console.log('Cancel')
  })

  $modalConfirmButton.addEventListener('click', () => {
    toggleModal()
    console.log('Confirm')
  })

  window.addEventListener('click', e => {
    if (e.target === $modal) {
      toggleModal()
      console.log('Cancel')
    }
  })
})()
