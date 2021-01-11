const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com
//app.com/help
//app.com/about
app.get('',(req,res)=> {
    res.render('index',{
        title: 'Weather App',
        name: 'Jayendra Sreekar'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Jayendra Sreekar'
    })  
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'Welcome to the Help page',
        title: 'Help',
        name: 'Jayendra Srekar'
    })  
})


app.get('/weather',({query}, res) => {
    if(!query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(query.address, (error,{latitude,longitude,location} ={})=>{
        if(error){
           return res.send({error});
        }
     
        forecast(latitude, longitude, (error, data) => {
           if(error){
            return res.send({error});
           }
           console.log(location)
           console.log(data);
           res.send({
            location,
            forecast: data,
            address: query.address
           })
        })
     })
})

app.get('/products',(req, res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
    
})

app.get('/help/*',(req, res) => {
    res.render('404',{title: '404',
    name: 'Jayendra Sreekar',
    errorMessage: 'Help article not found'})
})

app.get('*',(req, res) => {
    res.render('404',{title: '404',
    name: 'Jayendra Sreekar',
    errorMessage: 'Page not found'})
})

app.listen(3000, () => {
    console.log('Server started !!!!! on 3000')
})