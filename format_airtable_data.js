let [,, quote, phoneNumbers] = process.argv;

quote = JSON.parse(quote).records[0].fields.quote;
phoneNumbers = JSON.parse(phoneNumbers).records[0].fields.number;


console.log(quote);
console.log(phoneNumbers);
