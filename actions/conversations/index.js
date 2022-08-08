const core = require('@actions/core');

const payload = JSON.parse(process.env.payload);

// retrieve twilio client (need secrets)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const flowSid = process.env.FLOW_SID;
const proxyNumber = process.env.PROXY_NUMBER;
const client = require('twilio')(accountSid, authToken);

// retrieve phone number array
const phoneNumbers = payload.phoneNumbers;

// retrieve quote
const quote = payload.quote;

// send quote
sendMessage();

async function sendMessage() {

    // create empty conversation
    let conversation = await client.conversations.v1.conversations.create({friendlyName: 'Quote Recipients'});

    // add phone numbers to conversation
    await Promise.all(phoneNumbers.map(async number => await addPhoneNumber(conversation.sid, number)));

    // create message in conversation
    await client.conversations.v1.conversations(conversation.sid).messages.create({author: 'Quote', body: quote});

    // attach Studio Flow to conversation
    await client.conversations.v1.conversations(conversation.sid).webhooks.create({
      'configuration.flowSid': flowSid,
      'configuration.replayAfter': 0,
      target: 'studio'
   });

}

async function addPhoneNumber(conversationSID, number) {
      await client.conversations.v1.conversations(conversationSID).participants.create({
            'messagingBinding.address': number,
            'messagingBinding.proxyAddress': proxyNumber
      });
}
