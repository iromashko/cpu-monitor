const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(express.static('html'));

http.listen(3000);
