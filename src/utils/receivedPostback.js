import request from 'request';
import config from '../config';
import sendTextMessage from './sendTextMessage';
import saveGetStartedData from '../models/saveGetStartedData';

const PAGE_TOKEN = config.PAGE_TOKEN;

const startedConv = (recipientId, timeOfPostback) => {
  let name = '';

  request({
    url: `https://graph.facebook.com/v2.6/${recipientId}?fields=first_name`,
    qs: { access_token: PAGE_TOKEN },
    method: 'GET',
  }, (error, response, body) => {
    if (error) {
      console.log(`Error sending message: ${error}`);
    } else if (response.body.error) {
      console.log(`Error: ${response.body.error}`);
    } else {
      name = JSON.parse(body);
      sendTextMessage(recipientId, `Hello ${name.first_name} do you have a pen?`);
      try {
        saveGetStartedData(recipientId, name.first_name, timeOfPostback);
      }
      catch(err) {
        console.log(err);
      }
    }
  });
};

const receivedPostback = (event) => {
  const senderID = event.sender.id,
        recipientID = event.recipient.id,
        timeOfPostback = event.timestamp,
        payload = event.postback.payload;

  console.log(`Received postback for user ${senderID} and page ${recipientID} with payload '${payload}' at ${timeOfPostback}`);

  startedConv(senderID, timeOfPostback);
};

export default receivedPostback;