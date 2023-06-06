const express = require('express');
const apiRouter = require('./api')
const app = express();
const PORT = 3000;
const path = require("path");
const { client } = require('./DB/index');

app.use('/StoneCapImages', express.static(path.join(__dirname, 'StoneCapImages')));

app.use("/dist", express.static(path.join(__dirname, 'dist')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(PORT,  () => {
    console.log('The server is up on port ', PORT);
});

client.connect();
app.use(express.json());
app.use('/api', apiRouter);

module.exports = {app};
