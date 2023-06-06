'use strict'

const messages = { data: [] }

function getData () {
  fetch('https://dummyjson.com/comments')
    .then(res => res.json())
    .then(({ comments }) => {
      messages.data = comments
    })
    .then(() => renderMessages())
    .catch(alert)
}

function renderMessages () {
  const messagesList = document.querySelector('.messagesList')
  if (messagesList) {
    messagesList.remove()
  }

  const newMessagesList = document.createElement('ul')
  newMessagesList.addEventListener('click', clickHandler)
  newMessagesList.classList.add('messagesList')
  document.getElementById('root').prepend(newMessagesList)

  const messagesCollection = messages.data.map(item =>
    createMessagesListItem(item)
  )
  newMessagesList.append(...messagesCollection)
}

function createMessagesListItem ({ id, body }) {
  const message = document.createElement('li')
  message.classList.add('message')
  message.id = `${id}-message` // used like 'key' in React or Vue

  message.append(createMessageBody(id, body))
  message.append(createDeleteButton())

  return message
}

function createMessageBody (id, body) {
  const div = document.createElement('div')
  div.classList.add('messageBody')
  div.innerText = `${id}. ${body}`

  return div
}

function createDeleteButton () {
  const img = new Image()
  img.src = './images/trash.svg'
  img.alt = 'delete'

  const button = document.createElement('button')
  button.classList.add('deleteButton')
  button.append(img)

  return button
}

function clickHandler (e) {
  const targetItem = e.target
  if (targetItem.closest('.deleteButton')) {
    const targetMessage = targetItem.closest('.message')
    // remove from list
    messages.data = messages.data.filter(
      el => el.id !== +targetMessage.id.split('-')[0]
    )
    //remove from DOM
    targetMessage.remove()
  }
}

getData()
