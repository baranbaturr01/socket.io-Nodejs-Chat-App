const socket = io.connect('192.168.2.22:3002')

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const feedback = document.getElementById('feedback')
const output = document.getElementById('output')



submitBtn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    sender: sender.value
  })
})


socket.on('chat', data => {
  feedback.innerHTML = ''
  output.innerHTML += '<p><strong> ' + data.sender + ':</strong>' + data.message + '</p>'
  message.value = ''
})
message.addEventListener('keypress', (event) => {
  socket.emit('typing', sender.value)
  if (event.key === "Enter") {
    submitBtn.click()
  }
})

socket.on('typing', data => {
  feedback.innerHTML = '<p>' + data + ' yazıyor..</p>'
})