const chatSend = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Lấy tên user và tên room
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io();

//Tham gia vào room
socket.emit('joinRoom', { username, room });

// Lấy room và users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

//Tin nhắn từ máy chủ
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Ưư tiên tin nhắn gần được sử dụng hiển thị 
    chatMessage.scrollTop = chatMessage.scrollHeight;
});


// Tin nhắn được gửi
chatSend.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //Gửi tin nhắn tới máy chủ
    socket.emit('chatMessage', msg);

    //Xóa input vừa nhắn trên thanh send
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// DOM tin nhắn output
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span> ${message.time} </span></p>
        <p class="text">
            ${message.text}
        </p>`;
    document.querySelector('.chat-messages').appendChild(div);

}

//DOM room name
function outputRoomName(room) {
    roomName.innerText = room;
}
//DOM users
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}



  

