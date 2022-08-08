let [,, quoteIndex] = process.argv;

quoteIndex = Number(JSON.parse(quoteIndex).fields.index);

const nextQuoteIndex = quoteIndex + 1;

console.log(nextQuoteIndex);
