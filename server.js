const app = require('express')()
const http = require('http').createServer(app)
const port = 3000
const io = require('socket.io')(http)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    console.log('a socket is connected')
    socket.on('chatEvent', function(msg) {
        console.log(`${msg} from client`)
        // 用send只是让服务器回复消息
        // socket.send(`server says: ${msg}`)
        // 要广播出去，就用broadcast
        socket.broadcast.emit('ServerMsg', msg)
    })
})

http.listen(port, ()=>{
    console.log('server is runnint on: 3000')
})