const Alexa = require('ask-sdk-core');
const { getAttr, clearAttr } = require('../share/SessionHandler.js');
const SafraSaviApi = require('../share/SafraSaviApi');

module.exports = {
    canHandle(handlerInput) {
        
        const yesIntentFromLaunch = Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent' && getAttr(handlerInput, 'lastQuestion') === 'consulta-saldo-launch';
        
        const intentBalance = Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaSaldo';
        
        if(yesIntentFromLaunch){
            clearAttr(handlerInput, 'lastQuestion');
        }

        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && (yesIntentFromLaunch || intentBalance);
        
    },
    async handle(handlerInput) {       
        return await SafraSaviApi(handlerInput, 'balance');
    }
};