const Alexa = require('ask-sdk-core');
const SafraSaviApi = require('../share/SafraSaviApi');
const { getAttr } = require('../share/SessionHandler.js');

module.exports = {
    canHandle(handlerInput) {
        
        return getAttr(handlerInput,'logado') !== true;

    },
    async handle(handlerInput) {
        
        if(Alexa.getIntentName(handlerInput.requestEnvelope) === 'PinUsuarioIntent' && Alexa.getSlotValue(handlerInput.requestEnvelope, 'pin')){
            return await SafraSaviApi(handlerInput, 'login');            
        }

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('AUTH');
        const speakOutputReprompt = requestAttributes.t('AUTHREPROMPT');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutputReprompt)
            .getResponse();
            
    }
};

