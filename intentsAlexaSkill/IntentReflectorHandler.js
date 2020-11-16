const Alexa = require('ask-sdk-core');

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('REFLECTOR');
        const speakOutputReprompt = requestAttributes.t('REFLECTORREPROMPT');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutputReprompt)
            .getResponse();
    }
};