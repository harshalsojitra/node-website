const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const urlDarksky = 'https://api.darksky.net/forecast/052bc485ac44625c914e819ff63b75d7/' + latitude + ',' + longitude

    request({ url: urlDarksky, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to loaction', undefined)
        } else if(body.error) {
            callback('Unable to find URL location', undefined)
        } else {
            callback(undefined, ('It is currently ' + body.daily.data[0].summary + 'It is currently '+ body.currently.temperature +' degree out. This high today is '+ body.daily.data[0].temperatureHigh + '. This low today is '+ body.daily.data[0].temperatureLow +'.  There is '+ body.currently.precipProbability + '% chance of rain.'))
        }
    })
}

module.exports = forecast