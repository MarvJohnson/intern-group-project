let [,, quote, phoneNumbers] = process.argv;

// retrieve twilio client (need secrets)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// retrieve phone number array
phoneNumbers = JSON.parse(phoneNumbers).records.map(record => record.fields.number);

// retrieve quote
quote = JSON.parse(quote).records[0].fields.quote;

// create empty, temporary conversation
let quoteConversation;
client.conversations.v1.conversations
                       .create({friendlyName: 'Quote Recipients'})
                       .then(conversation => quoteConversation = conversation);

if (quoteConversation) {

    // add phone numbers to empty conversation
    phoneNumbers.forEach(number => {
        // add phone number as participant to the conversation
        quoteConversation.participants
        .create({
           'messagingBinding.address': number,
           'messagingBinding.proxyAddress': '<Twilio Number (Secret)>'
         });
    });

    // attach Studio Flow to conversation
    quoteConversation.webhooks
    .create({
       'configuration.flowSid': 'FW738979ea1b5270b6bb2aa62ce1413323',
       'configuration.replayAfter': 0,
       target: 'studio'
     });

     // create message in conversation
     quoteConversation.messages
     .create({
        author: 'Quote', 
        body: quote
    });
}

// will need to delete conversation when the Studio Flow ends
