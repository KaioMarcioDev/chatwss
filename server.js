const express = require('express')
const app = express()
app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)
const port = 8000

http.listen(port,()=>{

    console.log("Servidor iniciado . Abra o Navegador em http://localhost:" +port)

})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

serverSocket.on('connection', (socket)=>{
    
    socket.on('login',(nickname)=>{
        console.log('Cliente conectado: ' + nickname)
        serverSocket.emit('chat-msg',`Usuario ${nickname} conectou`)
        socket.nickname = nickname
    })

    socket.on('chat-msg',(msg)=>{
        console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`)
        serverSocket.emit('chat-msg',`${socket.nickname} diz: ${msg}`)
    })

    socket.on('status',(msg)=>{
        socket.broadcast.emit('status', msg)
    })
})
