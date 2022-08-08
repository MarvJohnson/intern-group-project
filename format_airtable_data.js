let [,, quote, phoneNumbers, quoteIndex] = process.argv;

console.log(`quoteIndex is [${quoteIndex}]`);

quoteIndex = Number(quoteIndex.fields.index);
quote = JSON.parse(quote).records[quoteIndex].fields.quote;
phoneNumbers = JSON.parse(phoneNumbers).records.map(record => record.fields.number);

const payload = {
 quote,
 phoneNumbers,
 phoneNumberLength: phoneNumbers.length
}

console.log(JSON.stringify(payload));
