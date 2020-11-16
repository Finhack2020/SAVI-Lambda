const Alexa = require('ask-sdk-core');
const SafraSaviApi = require('../share/SafraSaviApi');

module.exports = {
    canHandle(handlerInput) {
        
        return Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaExtrato';

    },
    async handle(handlerInput) {

           return await SafraSaviApi(handlerInput, 'transactions');
    }
};