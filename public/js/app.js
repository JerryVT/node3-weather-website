

console.log('Client side JS is loaded')

// this client side js is used to retrieve data to js
// fetch is an api function that is not part of js but is a browser based api and it is also not accessible in node and hence cant be used in backend js
// it is asynchronous
// fn will run when data is available




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2') //# is used when we have to access a id
const messageThree = document.querySelector('#message-3')

const weatherImage = document.createElement('img')

weatherForm.addEventListener('submit', (e) => {     //e is short of event

    e.preventDefault()  //prevents page from reloading which is the default behaviour

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '     //clearing content

    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
       if(data.error) {
         
          messageOne.textContent = data.error
       } else {
        
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast.desc
        messageThree.textContent = data.forecast.windSpeed

        weatherImage.src = data.forecast.picUrl
        document.querySelector('.weather_icon').appendChild(weatherImage)

       }
    })
})

    console.log(location)
})

