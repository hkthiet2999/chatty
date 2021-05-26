const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./router/message');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./router/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Đặt thư mục tĩnh
app.use(express.static(path.join(__dirname, 'views')));

const admin = 'admin';

//Chương trình chạy khi user kết nối
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // Chào mừng người dùng đang thực thi
        socket.emit('message', formatMessage(admin, 'Welcome to CHAT APP'));

        //Phát sóng khi người dùng kết nối
        socket.broadcast.to(user.room).emit('message', formatMessage(admin, `${user.username} has join the room`));

        // Gửi thông tin users và room 
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    });


    //Lấy tin nhắn chatSend từ user
    socket.on('chatMessage', msg => {

        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    //Chạy khi user mất kết nối
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(admin, `${user.username} has left the room`));


            // Gửi thông tin users và room 
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })

        }

    });

});

const PORT = 8080 || process.env.PORT;

server.listen(PORT, () => {
    console.log('http://localhost:'+PORT);
});