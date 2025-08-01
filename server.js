const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

// These are url and key to fetch the openweather data....
 const apiKey =  process.env.OPENWEATHER_API_KEY;
 const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Here we fetch the data...
 async function fetchWeather(city){
    // const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    return await response.json();  // Return the response to data (line no - 18)
 }

 // make an api and get a req (city) from user : And call
 app.get('/api', async(req,res)=>{
    const city = req.query.city;
    try{
        const data = await fetchWeather(city)  // Call the fetchWeather function.
        console.log(data)
        res.json(data)  // Now we get the data and send a response to user
    } catch(err){  
        console.error(`Cannot fetch ${err}`)
        res.status(500).json('Server not Respond, Try again after sometime!')  // After get some error : Response this-
    } 
 }) 


app.listen(5000,()=>{  // port to run the server
    console.log('Server started!')
})
  