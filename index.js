const Alexa = require('ask-sdk-core');
const dotenv = require('dotenv');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

//Custom Intents
const LaunchRequestHandler = require('./intentsAlexaSkill/LaunchRequestHandler');
const MorningCallsIntentHandler = require('./intentsAlexaSkill/MorningCallsIntentHandler');
const HelpHandler = require('./intentsAlexaSkill/HelpHandler');


const LoginHandler = require('./intentsAlexaSkill/LoginHandler');
const BalanceIntentHandler = require('./intentsAlexaSkill/BalanceIntentHandler');
const TransactionIntentHandler = require('./intentsAlexaSkill/TransactionIntentHandler');

//Default
const ExitIntentHandler = require('./intentsAlexaSkill/ExitIntentHandler');
const CancelIntentHandler = require('./intentsAlexaSkill/CancelIntentHandler');

const FallbackIntentHandler = require('./intentsAlexaSkill/FallbackIntentHandler');
const SessionEndedRequestHandler = require('./intentsAlexaSkill/SessionEndedRequestHandler');
const IntentReflectorHandler = require('./intentsAlexaSkill/IntentReflectorHandler');
const ErrorHandler = require('./intentsAlexaSkill/ErrorHandler');


/* LANGUAGE STRINGS */
const languageStrings = require('./languages/languageStrings');



// This interceptor function checks to see if a user has enabled permissions
// to access their profile information. If not, a request attribute is set and
// and handled by the InvalidPermissionsHandler
const PermissionsCheckInterceptor = {
    async process(handlerInput) {
      const { serviceClientFactory, attributesManager } = handlerInput;
  
      try {
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
  
        const profileName = await upsServiceClient.getProfileName();
        const profileEmail = await upsServiceClient.getProfileEmail();
        const profileMobileNumber = await upsServiceClient.getProfileMobileNumber();
  
        if (!profileName) {
          // no profile name
          attributesManager.setRequestAttributes({ permissionsError: 'no_name' });
        }
  
        if (!profileEmail) {
          // no email address
          attributesManager.setRequestAttributes({ permissionsError: 'no_email' });
        }
  
        if (!profileMobileNumber) {
          // no mobile number
          attributesManager.setRequestAttributes({ permissionsError: 'no_phone' });
        }
      } catch (error) {
        if (error.statusCode === 403) {
          // permissions are not enabled
          attributesManager.setRequestAttributes({ permissionsError: 'permissions_required' });
        }
      }
    },
  };

// This interceptor function is used for localization.
// It uses the i18n module, along with defined language
// string to return localized content. It defaults to 'en'
// if it can't find a matching language.    
const LocalizationInterceptor = {
    process(handlerInput) {
      
      dotenv.config();
      const { requestEnvelope, attributesManager } = handlerInput;
  
      const localizationClient = i18n.use(sprintf).init({
        lng: requestEnvelope.request.locale,
        fallbackLng: 'pt-BR',
        resources: languageStrings,
      });
  
      localizationClient.localize = (...args) => {
        // const args = arguments;
        const values = [];
  
        for (let i = 1; i < args.length; i += 1) {
          values.push(args[i]);
        }
        const value = i18n.t(args[0], {
          returnObjects: true,
          postProcess: 'sprintf',
          sprintf: values,
        });
  
        if (Array.isArray(value)) {
          return value[Math.floor(Math.random() * value.length)];
        }
        return value;
      };
  
      const attributes = attributesManager.getRequestAttributes();
      attributes.t = (...args) => localizationClient.localize(...args);
    },
  };

//Lambda function
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ExitIntentHandler,
        HelpHandler,
        LoginHandler,
        BalanceIntentHandler,
        MorningCallsIntentHandler,
        TransactionIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler,
        CancelIntentHandler,
    )
    .addRequestInterceptors(
        PermissionsCheckInterceptor,
        LocalizationInterceptor,
      )
    .withCustomUserAgent('SAVI-SAFRA/ALEXA-SKILL/v1.0')
    .addErrorHandlers(ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();