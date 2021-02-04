const config = require('../databaseConfig.json');
const { WebhookClient } = require('dialogflow-fulfillment');
const kbResponse = require('../knowledgebase/kbResponse.json');
const { response } = require('express');
const log4js = require("log4js");
const appConfig = require('../appConfig.json');


/**
 *  Loggeer to handle and monitor the request resolution
 *  Log file can be found in /logs/olive.log 
 *  The log file adheres to grok pattern and can be fed to elastic search 
 */
log4js.configure({
    appenders: { oliveLog: { type: "file", filename: "logs/olive.log" } },
    categories: { default: { appenders: ["oliveLog"], level: "debug" } }
});

const logger = log4js.getLogger("oliveLog");

/**
 * @method resolveIntent 
 * @description resolveIntent Method is responsible for handling the incoming intent resolution. 
 *              Method further calls upon dialogflowFulfillment to map the intent handler
 * @param {*} request 
 * @param {*} response 
 */
const resolveIntent = function (request, response) {

    if (!request)
        logger.error(appConfig.Errors.EmptyRequest);


    try {
        dialogflowFulfillment(request, response);
    } catch (err) {
        logger.error(appConfig.Errors.UnableToHandleIntent)
    }
}


/**
 *  @method getQuantity
 *  @description This method mocks the quantity of the product available from the database
 *  @param 
 *  @returns Integer
 */
const getQuantity = function () {
    let min = 1;
    let max = 100;

    return Math.floor(
        Math.random() * (max - min) + min
    );
}


/**
 * @method constructResponse
 * @description method handles the construction of response string to be sent back to Agent and displayed on chat system.
 * @param {*} quantity 
 * @param {*} product 
 * @param {*} stores 
 */
const constructResponse = function (quantity, product, stores) {
    let responseStr;

    //The product quantity received would be between 0-N, any quantity greater than 1 shall be a plural value hence.
    let productPlural = (quantity > 1) ? product + 's' : product;

    responseStr = kbResponse.responseConstruct.Starting + quantity + ' ' + productPlural + ' ' +
        kbResponse.responseConstruct.Filler + ' ' + stores + ' ' +
        kbResponse.responseConstruct.Ending;

    logger.info(responseStr);
    return responseStr;
}


/**
 * @method dialogflowFulfillment 
 * @description This method handles the request fulfillment for all the intent resolution request by Dialogflow.
 *              This core method handles responsibilities like, Intent mapping, collation of response and responding to the request.
 * @param {*} request 
 * @param {*} response 
 */
const dialogflowFulfillment = function (request, response) {
    const agent = new WebhookClient({ request, response });

    function productAndStoreIntent(agent) {
        let availableQantity = getQuantity();
        let product = agent.parameters.Product;
        let stores = agent.parameters.Store;
        let responseString = constructResponse(availableQantity, product, stores);
        try {
            if (!responseString) {
                throw new Error(appConfig.Errors.UnableToHandleIntent);
            }
        }catch (err) {
            logger.error();
            responseString = appConfig.Errors.GracefulDegradation;
        }
        logger.info('Received Response Sting' + responseString);
        agent.add(responseString);
    }

    //Intent Mapping - This can also be done dynamically based on the intent.displayname carried by agent 
    let intentMap = new Map();
    intentMap.set("ProductStore", productAndStoreIntent);

    agent.handleRequest(intentMap);
}


module.exports = {
    resolveIntent
}