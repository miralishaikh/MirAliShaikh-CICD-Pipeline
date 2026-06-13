const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from MirAliShaikh-CICD-Pipeline! v1\n');
});

app.listen(PORT, () => {
    console.log(Running on port ${PORT});
});
