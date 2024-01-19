const bcrypt = require('bcryptjs');


const pss1 = "HelloWorld";
const pss2 = "helloWorld";

const hash1 = bcrypt.hashSync(pss1,10);
const hash2 = bcrypt.hashSync(pss2,10);

console.log(`hash1 ${hash1}`);
console.log(`hash2 ${hash2}`);