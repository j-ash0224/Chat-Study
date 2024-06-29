const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// 뷰 및 뷰 엔진 설정
app.set('views', './src/views');
app.set('view engine', 'ejs');

// 라우트 설정
const route = require('./src/route/route.js');
app.use('/', route);

// Socket.io 연결 처리
io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    // 채팅 메시지 수신
    socket.on('chat message', (data) => {
        const { nickname, message } = data;
        io.emit('chat message', { nickname, message }); // 모든 클라이언트에게 메시지 방송
    });

    // 연결 종료 처리
    socket.on('disconnect', () => {
        console.log('사용자가 연결을 해제했습니다.');
    });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

module.exports = { server, io };
