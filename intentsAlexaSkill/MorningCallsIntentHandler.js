const Alexa = require('ask-sdk-core');
const SafraSaviApi = require('../share/SafraSaviApi');

module.exports = {
    canHandle(handlerInput) {
        
        return Alexa.getIntentName(handlerInput.requestEnvelope) === 'MorningCalls';
        
    },
    async handle(handlerInput) {

        return await SafraSaviApi(handlerInput, 'morning');

    }
};