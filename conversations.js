let [,, quote, phoneNumbers, accountSid, authToken, flowsid, proxyNumber, client] = process.argv;

const client = require('twilio')(accountSid, authToken);

// retrieve phone number array
phoneNumbers = JSON.parse(phoneNumbers).records.map(record => record.fields.number);

// send quote
sendMessage();

async function sendMessage() {

    // create empty conversation
    let conversation = await client.conversations.v1.conversations.create({friendlyName: 'Quote Recipients'});

    // add phone numbers to conversation
    await phoneNumbers.forEach(number => addPhoneNumber(conversation.sid, number));

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
