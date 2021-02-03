/** 
 * This is the landing page of Olive-Dialogflow-Webhook
*/

const express = require('express');
const bodyParser = require('body-parser');
const webhookHandler = require('./route/webhookRoute');
const appConfig = require("./appConfig.json");

const port = process.env.PORT || appConfig.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Setup the router for handling calls from Dialogflow
app.use('/dialogflow-fulfillment',webhookHandler);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});
