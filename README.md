# olivetest_webhook
webhook for connecting dialogflow agent

This is a webhook hosted to connect with chatbot created using Dialogflow. 

## The Design

The task was to Create a conversation bot to handle a simple query 'User trying to get stock status of a fruit in a perticular store' 
   - This node.js service has an HTTP endpoint hosted at port 3000, the port number is configurable. 
   - The service can be placed behind a reverse proxy like Apigee or Ngrok or even hosted in a servcice provider like heroku to have the HTTPS endpoint which is required by Dialogflow
   - The Dialoglflow will have 2 Intents Namely, Welcome and ProductStore. Product store will have 2 followup Intent to check if the bot can assist user any further. 
   - To collect information from user, we are using system entity person to welcome the user and Product and stores are 2 custom entity created
  
## Project Structure

  - app.js     - Entrypoint and service hosting details. Service is hosted on port 3000. 
  - router     - This contains route files which points to their immplementation in controller.
  - controller - This folder contains the implementation for routes. The business logic is present here
  - logs       - A folder to capture logs for the execution and debugging. The log-level is currently set to debug. 
  - database   - Contains the schema for which can be created to host the DB. MYSQL is used. 
  - Knowledgebase - Contains response strings which are used in the project (only for one intent).
  - Olive.zip  - Dialogflow agent which can be imported and tested.

## Installation

```
npm install 
npm start
```

I have used the NGROK to expose the API, we can also use Apigee API gateway/any other hosting services like Heroku

```
ngrok http 3000 
``` 
For time being, I have resorted to using ngrok.
Note the HTTPS endpoint given by NGROk 

## Dialogflow

Open Dialoflow and Create and Agent Olive 
Download the Olive.zip from the repository
Once the Import is complete the Agent is ready to be used. All we have to do is add fulfilment section. 
Note the HTTPS endpoint from previous section and paste here in the webhook section of fullfilment tab. 
Save the setting by selecting Done button at the bottom of screen

## Documentation 

The methods exposed are having the doxygen written to help create a JS documentation for the APIs exposed. Explaining about the method and parameteres which would be taken. 

## Scope for Improvment

```
  - Config driven Error messages and status codes
  - i18n support for response based on the region of service being called from 
  - Finer grain method implementation to check the input parameteres
  - Containerisation of the service created to be hosted in the docker / pod
  - API Swagger documentation for Third party use.
  - Logging can be sent to Elastic logstash and monitored. 
```
