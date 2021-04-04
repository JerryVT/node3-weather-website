const request = require('request')     // npm module for handling http request

const geocode = (address, geocode_callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  + '.json?access_token=pk.eyJ1IjoiamVycnk5NSIsImEiOiJja210OHVxbTIwcGU1Mm9wbWdjZzZ0bTI0In0.M2Ub3HRXTrdb1n8Y9UTROA&limit=1'
 
    // request({url: url, json:true}, (error, response) => { // this fn is invoked to do a specific operation once the request operation fetched data by processing HTTP GET. This fn is different from callback fn defined
      
    request({url, json:true}, (error, {body}) => {  //after destructuring..note that response is also an object with body as its property  
      
      if(error) {
         geocode_callback('Unable to connrct to locations services', undefined)      // a call to callback fn present in app.js is made passing the values as args
       } else if(body.features.length === 0 ) {  //content is empty
         geocode_callback('Unable to find location. Try a different place', undefined) // a call to callback fn present in app.js is made passing the values as args
       } else {
         geocode_callback(undefined,{                                    // a call to callback fn present in app.js is made passing the values as args
             latitude: body.features[0].center[1],       // this is the data part. for error undefined is returned as there is no error
             longitude: body.features[0].center[0],
             location :body.features[0].place_name
          })
       }
    })
 }

 module.exports = geocode