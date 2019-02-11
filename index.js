require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./route')
const app = express();

const port = process.env.PORT;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.set('view engine', 'ejs');


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});
