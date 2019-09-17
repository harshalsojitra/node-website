const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port  = process.env.PORT || 3000 

// Define path for express configuration.
const publicDiractoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../tempalets/views')
const partialPath = path.join(__dirname, '../tempalets/partials')

//setup handlers engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory.
app.use(express.static(publicDiractoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Harshal Sojitra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'A boy with some funny english accent.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'We are here to help you!',
        title: 'Help',
        name: '24x7 Help is available!'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide actual location.'
        })
    } 
    
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                    forecast: forecastData,
                    location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You are not searching anything (:'
        })
    }

    //consider below code as else because this raw code makes more sense than else statement.
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 help',
        name: 'harshal sojitra',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404', 
        name: 'Harshal sojitra',
        errorMessage: 'Page is not found.'

    })
})

app.listen(port, () => {
    console.log('Server is up and running babie!' + port)
})