const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use('/',express.static(__dirname + '/public'));

io.on('connection',socket=>{
	socket.on('message',data=>{
		console.log(`${data.user}:${data.text}`)
		io.emit('message',data)//ioでemitすることで接続者全員にブロードキャスト
	})
	socket.on('userdisconnet',user=>{
		console.log(`Disconnect User ${user}`);
		io.emit('userdisconnet',user);
	})
	socket.on('username',user=>{
		console.log(`Connect User ${user}`);
		io.emit('username',user);
	})
})

http.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});

