const server=require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
  
// const io = require('socket.io')(5000)
// io.set("origins",'*:*')
const users = {};
io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
        users[socket.id] =name;
        socket.broadcast.emit('user-joined',name) ;
    }); 
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

})
server.listen(5000) 