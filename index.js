const dotenv = require('dotenv');

dotenv.config();

const createDID = require('./examples/dock-did');

const main = async () => {
  await createDID();
};

main();
