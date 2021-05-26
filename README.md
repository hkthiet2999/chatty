# chatty
Final version chatting website

## Mô tả
Xây dựng trang web chat trực tuyến bằng cách sử dụng giao thức Web Socket. Trang web sẽ có các chức năng sau

### Chức năng Đăng nhập và chọn chatroom
Người dùng sẽ nhập username và chọn chatroom, ứng dụng sẽ không có DB và không có cơ chế xác thực người dùng mà chỉ tập trung vào việc chat với nhau giữa các users
Đây là giao diện đăng nhập

![](readme_imgs/login.pns)

### Chức năng trò chuyện giữa các user

![](readme_imgs/main.pns)

Sau khi đăng nhập vào trang web, người dùng được chuyển hướng đến trang chủ,
nơi mà danh sách những người dùng đang trực tuyến được hiển thị. Danh sách này sẽ được cập nhật theo thời gian thực. Nếu một người 
dùng bắt đầu vào một cuộc trò chuyện thì tên của họ sẽ được hiển thị trong Danh sách người dung. 
Nếu người dùng đăng xuất hoặc đóng trình duyệt thì họ sẽ được xóa ra khỏi 
danh sách của các người dùng khác ngay lập tức.

Các users có thể trò chuyện realtime với nhau trong cùng một chatroom. Mỗi user có thể sử dụng các emoji có sẵn và nhập văn bản trong khung chat.

## Sử dụng

  - Clone Repo
  
  - `npm install`
  
  - `npm start`
