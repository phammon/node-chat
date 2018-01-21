const path = require('path');
//now we don't have to go up a directory
const publicPath = path.join(__dirname + '/../public');
const express = require('express');

console.log(publicPath);

var app = express();
 //tells heroku to use whatever port it needs or if were running locally just use 3000
const port = process.env.PORT || 3000

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`started listening on ${port}`);
})

module.exports = {app};