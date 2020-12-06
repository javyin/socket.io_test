const app = require('express')()
const http = require('http').createServer(app)
const port = 3000
const io = require('socket.io')(http)

//  这里设置浏览器访问相关路径时的操作
app.get('/', function(req, res) {
    // 访问'/'时发送index.html文件
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    console.log('a socket is connected')
    // chatEvent可以监听客户端发送的消息
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