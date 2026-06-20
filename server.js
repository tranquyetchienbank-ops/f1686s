const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Phục vụ các file tĩnh khác (nếu có)
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});
