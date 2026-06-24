const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello! This is Mir\'s professional DevOps CI/CD pipeline running live via ngrok!\n');
});

app.listen(PORT, () => {
    console.log(Running on port ${PORT});
});
