const express = require('express');

const app = express();

app.use(express.static('./dist/idle-space'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/idle-space/'}),
);

app.listen(process.env.PORT || 8080);
