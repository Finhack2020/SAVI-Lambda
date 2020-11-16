const Alexa = require('ask-sdk-core');
const axios = require('axios');
const { createAttr, getAttr } = require('./SessionHandler.js');

module.exports = function(handlerInput, endPoint){
        
    
    if(!getAttr(handlerInput, 'UserId') && !getAttr(handlerInput, 'DeviceId')){
        createAttr(handlerInput, 'UserId', Alexa.getUserId(handlerInput.requestEnvelope));
        createAttr(handlerInput, 'DeviceId', Alexa.getDeviceId(handlerInput.requestEnvelope));
    }
    
    var path = process.env.URL_SAFRA_SAVI;
    
    if(endPoint === 'balances'){
        path += '/balances';
    } else if(endPoint === 'login'){
        path += '/';
    } else if(endPoint === 'transactions'){
        path += '/transactions/';
    } else if(endPoint === 'morning'){
        path += '/morning-calls';
    }
    
    

    axios.post(path, handlerInput.requestEnvelope)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
};