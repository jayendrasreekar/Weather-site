const request = require('request')

const geocode = (address,callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoianNyZWVrYXIiLCJhIjoiY2tpeWYya2h2MHhxZzMxbnhpbXhhbXVvMSJ9.mOTh8ylM79aSAlp_tt7xAA&limit=1'
    request({url,json:true}, (err, {body})=> {
       if(err){
          callback('Unable to connect to the location services !',undefined);
       }else if(body.features.length === 0){
          callback('Unable to find Location. Try another search',undefined)
       }else{
          callback(undefined,{
             longitude: body.features[0].center[0],
             latitude: body.features[0].center[1],
             location: body.features[0].place_name
          })
        }
     })
  }

  module.exports = geocode