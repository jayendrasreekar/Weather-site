const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fb728ba28bbf85a1d55c4f90eccc6506&query='+latitude+','+longitude

    request({url,json: true},(err, {body}) => {
        if(err){
        callback('Error connecting to Weather service!!',undefined)
        }else if(body.error){
        callback('Error: The given location is invalid!!',undefined)
        }
        else{
        callback(undefined,body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature+ ' degrees out. It feels like '+body.current.feelslike +' degrees out. Humidity is  '+ body.current.humidity + '%')
        }
    })
}

module.exports = forecast