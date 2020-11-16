const Alexa = require('ask-sdk-core');
const { createAttr } = require('../share/SessionHandler.js');

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        //Configurações da sessão Alexa
        createAttr(handlerInput, 'pin', 'teste');
        createAttr(handlerInput, 'Auth', '');
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME');
        const speakOutputReprompt = requestAttributes.t('HELP');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutputReprompt)
            .getResponse();
            
    }
};