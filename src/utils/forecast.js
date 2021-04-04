//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')   //for handling HTTP requests

const forecast = (longitude, latitude, forecast_callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8912e369128479a1e25a155e3a2fe7a4&query=' + latitude + ',' + longitude + '&units=f'

   // request({url: url, json: true}, (error, response) => {                // json as true retreives data in json form and hence no need to convert to JSOn 
   
   request({url, json:true},(error, {body}) => {        //after destructuring
   if (error) {         // for low level OS related errors such as no network
             forecast_callback('Unable to connect to weather service', undefined)  //undefined is set by js if a variable is not assigned with value. Here we are setting it manually but if left, js automatically set it as undefined
        } else if (body.error) {   // if an error comes because of issue in url, it will come as a response from server. hence a diff if condt
              forecast_callback('Unable to find location', undefined)
        } else {
              forecast_callback( undefined,
                //{                                                               //passing object
                  //temperature: response.body.current.temperature,
                  //humidity: response.body.current.humidity

                 // temperature: body.current.temperature,  //after destructuring
                 // humidity: body.current.humidity

                  //}
                  "It is currently " + body.current.temperature + " degrees outside and have a humuidity of " + body.current.humidity
                )
        }
            //    console.log("It is currently" + response.body.current.temperature + " degrees out and have a humuidity of " + response.body.current.humidity)
            //    }
    })

}

module.exports = forecast       //fn had to be exported so that it can be used by others