const Alexa = require('ask-sdk-core');

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent'
            );
    },
    handle(handlerInput) {

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('STOP');
        
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .speak(speakOutput)
            .getResponse();
            
    }
};