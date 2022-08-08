let [,, quote, phoneNumbers, quoteIndex] = process.argv;

quoteIndex = Number(quoteIndex);
quote = JSON.parse(quote).records[0].fields.quote;
phoneNumbers = JSON.parse(phoneNumbers).records.map(record => record.fields.number);

const payload = {
 quote,
 phoneNumbers,
 phoneNumberLength: phoneNumbers.length
}

console.log(JSON.stringify(payload));
