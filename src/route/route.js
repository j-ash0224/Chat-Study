const express = require("express");
const router = express.Router();

router.get('/chat', (req, res) => {
    res.render('./chat.ejs');    // render를 사용해서 /chat 경로에 chat.ejs을 사용자에게 전달
})

module.exports = router;