let [,, quote, phoneNumbers] = process.argv;

console.log('\n-----');

quote = JSON.parse(quote).records[0].fields.quote;
phoneNumbers = JSON.parse(phoneNumbers).records[0].fields.number;


console.log(quote);
console.log(phoneNumbers);
