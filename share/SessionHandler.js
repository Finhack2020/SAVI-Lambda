const getAttr = function(handlerInput, attr){
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    return sessionAttributes[attr];
};

const modifyAttr = function(handlerInput, attr, value){
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes[attr] = value;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
};

const createAttr = function(handlerInput, attr, value){
    modifyAttr(handlerInput, attr, value);
};

const clearAttr = function(handlerInput, attr){
    modifyAttr(handlerInput, attr, null);
};

const deleteAttr = function(handlerInput, attr){
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    delete sessionAttributes[attr];
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
};

module.exports = {
    getAttr,
    modifyAttr,
    createAttr,
    clearAttr,
    deleteAttr
};