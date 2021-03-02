const express = require('express');

const app = express();

app.use(express.static('./dist/IdleSpace'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/IdleSpace/'}),
);

app.listen(process.env.PORT || 8080);
