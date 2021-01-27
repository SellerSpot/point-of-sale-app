const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const port = Number(process.env.PORT) || 9000;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.info('server started on port', port);
});