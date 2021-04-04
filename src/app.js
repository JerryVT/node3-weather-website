const path = require('path')    //not npm module so no need to install
const express = require('express')          //for loading the libraries
                                            // express is a function to create a new express application

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

 console.log(__dirname);
// console.log(__filename);
console.log(path.join(__dirname, '../public'));

const publicDirectory = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()                       // to store the expressw application
                                            // express() will generate the application

// Setup static directory to serve
app.use(express.static(publicDirectory))       

//Setup handlebars engine and views location
app.set('view engine', 'hbs')       // setting up by telling which template engine (hbs) we have installed

app.set('views', viewPath)          // updating the express to check html files in templates folder and not views folder
                                    // express by default checks the html pages in views folder in the root for rendering. This command can change that path                                    

hbs.registerPartials(partialsPath)  // setting hbs for partials - header, footer

app.get('', (req, res) => {                 // for root
    res.render('index', {
        title: 'Weather App',
        name: 'Jerry'
    })         //this name should match with the file name in views folder
                                // here by calling the response.render, express goes off to find the file in views folder and converts it into html 
})

app.get('/help', (req, res) => {            // for the route site/help
    res.render('help',{
        helpText: 'This is some helpful text',             // express will automoatically detect the object and stringify it to JSON
        title: 'Help',
        name: 'Jerry'
    })
})                                                      

 app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Jerry'
    })
 })

app.get('/weather', (req, res) => {         //req, res are request and response objects
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an addresss'
        })
    }

    const location = req.query.address
    
    geocode(location, (error, {latitude, longitude, location} = {} ) => {   //after destructuring above line.  {latitude, longitude, location} = {} is given so that they will be assigned to empty object if error happens. This is because at time of error, object returned for data is undefined which causes issue here as there are no properties 
   if(error) {
       return res.send({
           error: error
       })                 // the second argument is a fn defined in arrow fn form () => {....}
      } 
   
      //console.log('Data', data);                   // 2 args are given for fn defined here..error and data which are passed when a callback is made to this fn from fn geocode in geocode.js

      forecast(latitude, longitude, (error, forecastData) => {  // this is callback chaining -> chaining together multiple callbacks to do multiple things in a specific order
         if(error) {
           return res.send ({
               error: error
           })  //return is used so that we dont have to add else stattemt to display data when there is no error
         }
         
         res.send({
             location: location,
             forecast: forecastData
         })

      })
   })

})

app.get('/products', (req, res) => {
                                            // localhost:3000/products?search=games&rating=5 -> here everything after ? is the query requested and if there are multiplke queries they are separated by &
    //console.log(req.query);                 //req.query - the query string provided along with requet (added in address) has been parsed by express and data is made available as ibject here
    // we cannot force express to check if the fields such as search is present or not. For that we need to check through condt stmnts

    if(!req.query.search) {
        return res.send({                               // keep sure to provide return as it will throw error otherwise as there are two response for the same route
            error: 'You must provide a search term'
        })
    }

    console.log(res.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {       // in cases user tries to find an article in help which is incoirrect or nay have been deleted
    res.render('404', {
        title: 'Error',
        name: 'Jerry',
        errorMessage: '404 : Help Article not found'
    })
})

app.get('*', (req, res) => {       // * can be used to match all other routes that are not defined above to handle unwatend routes like localhpost:3000/where which is not routed and does not exist
    // when a route is mentioned in browser, express first checks it in the oublic folder where we have kept some static htmls, then it checks the routes we have defined. If no match is found, then it will come to this to display 404 -> page not found
    res.render('404', {
        title: 'Error',
        name: 'Jerry',
        errorMessage: '404 : Page Not Found'
    })
})

app.listen(3000, ()=> {                          //starts server and listen to port 3000
    console.log('Server is up on port 3000')
})           

