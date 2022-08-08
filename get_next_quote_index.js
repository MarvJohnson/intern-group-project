let [,, quoteIndex] = process.argv;

quoteIndex = Number(quoteIndex.fields.index);

const nextQuoteIndex = quoteIndex + 1;

console.log(nextQuoteIndex);
