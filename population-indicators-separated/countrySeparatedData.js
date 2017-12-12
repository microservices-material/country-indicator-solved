/* country population data service */

// include libraries
const _ = require('lodash');                 // basic functions
const express = require('express')           // web server
const bodyParser = require("body-parser");   // addon to express, to make it able to parse post request bodies
const request = require('request')           // allows to perform HTTP requests
const jwt = require('jsonwebtoken')          // handles authentication tokens
const Promise = require("bluebird")          // Promise implementation

const auth = require('./authentication')       // our (tiny) authentication library

// library initialization
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* country population - http services */

// country population
app.get('/countries/:countryId/population',function(request,response) {
  const countryId = request.params.countryId
  const authToken = request.get("Authorization")

  auth.verifyToken(authToken)
    .then(function(plainToken) {
      try {
        var populationData = currentPopulationData(countryId)
        response.status(200)
        response.json( populationData )
      } catch (e) {
        response.status(400)    // bad request
        response.json( {"error": e.message} )
      }
    })
    .catch(function(err) {
      response.status(401)    // unauthorized
      response.json( { error: 'Invalid token'} )
    })

})

app.get('/countries/:countryId/indicators',function(request,response) {
  const countryId = request.params.countryId
  const authToken = request.get("Authorization")

  auth.verifyToken(authToken)
    .then(function(plainToken) {
      try {
        var indicatorData = countryIndicators(countryId)
        response.status(200)
        response.json( indicatorData )
      } catch (e) {
        response.status(400)    // bad request
        response.json( {"error": e.message} )
      }
    })
    .catch(function(err) {
      response.status(401)    // unauthorized
      response.json( { error: 'Invalid token'} )
    })

})


/* make app ready to accept requests */
app.listen(8082, null, null, () => console.log('country separated service ready'))



/*
 business functions
*/

function currentPopulationData(countryId) {
  var theData = null
  if (countryId == 1) {
    theData = { total: 44272125, males: 21668578, females: 22603547 }
  } else if (countryId == 2) {
    theData = { total: 211243220, males: 103802340, females: 107440880 }
  } else if (countryId == 3) {
     theData = { total: 68292388, males: 33628208, females: 34664180 }
  } else {
    throw new Error("There is no country having id " + countryId)
  }
  theData.countryId = countryId
  return theData
}

function countryIndicators(countryId) {
  var theData = null
  // Argentina 
  if (countryId == 1) { 
    theData = { gini: 42.67, hdi: 0.83, lifeExpectancy: 76.3, gdpPerCapita: 12450 }
  // Brazil
  } else if (countryId == 2) { 
    theData = { gini: 51.48, hdi: 0.75, lifeExpectancy: 75, gdpPerCapita: 8650 }
  // Thailand
  } else if (countryId == 3) {
    theData = { gini: 37.85, hdi: 0.74, lifeExpectancy: 74.9, gdpPerCapita: 5900 }
  } else {
    throw new Error("There is no country having id " + countryId)
  }
  theData.countryId = countryId
  return theData
}

  





