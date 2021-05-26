const users = []

//User tham gia vaò phòng
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

// Lấy user hiện tại
function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

//User rời khỏi phòng
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index != -1) {
        return users.splice(index, 1)[0];
    }

}

// Lấy thông tin phòng
function getRoomUsers(room) {
    return users.filter(user => user.room == room);
}

module.exports = {
    userJoin, getCurrentUser,userLeave,getRoomUsers
}