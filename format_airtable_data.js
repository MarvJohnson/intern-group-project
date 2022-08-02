let [,, quote, phoneNumbers] = process.argv;

const removeEscapeCharacters = (value) => quote.replace(/\\/g, '');

console.log(quote);
console.log(phoneNumbers);

quote = JSON.parse(removeEscapeCharacters(quote)).records[0].fields.quote;
phoneNumbers = JSON.parse(removeEscapeCharacters(phoneNumbers)).records[0].fields.number;


console.log(quote);
console.log(phoneNumbers);
