const request = require('request')

const geocode = (address, callback) => {
    const urlGeocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiaGFyc2hhbHNvaml0cmEiLCJhIjoiY2swZHF6bWpvMDJrNjNta2Z5MWd4YTJ1NyJ9.AatzNez5YKj8_v8Pk0HN0Q'

    request({ url: urlGeocode, json:true }, (error, { body }) =>{
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length  === 0) {
            callback('Unable to find location. Please find another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode