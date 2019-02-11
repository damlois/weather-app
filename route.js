require('dotenv').config();
const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index', {weather: null, error: null});
})

router.post('/', (req,res)=>{
    const city = req.body.city;
    const apiKey = process.env.KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, (err, resp, body)=>{
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else{
            let resBody = JSON.parse(body);
            if(resBody.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            }
            else{
                const weatherText = `It's ${resBody.main.temp} degrees celcius and ${resBody.weather[0].description} in ${resBody.name}!`;
                res.render('index', {weather: weatherText, error: null, img_link : `http://openweathermap.org/img/w/${resBody.weather[0].icon}.png`});
            }
        }
    })
})

module.exports = router;