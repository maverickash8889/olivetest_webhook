const config  = require('../databaseConfig.json');
const {WebhookClient} = require('dialogflow-fulfillment');


const resolveIntent = function(request, response){
    dialogflowFulfillment(request,response);
}


const dialogflowFulfillment = function(request,response){
    const agent = new WebhookClient({request,response});

    function sayHello(agent){
        agent.add("Hi there, this is a response from webhook");
    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello);

    agent.handleRequest(intentMap);
}


module.exports  = {
    resolveIntent
}