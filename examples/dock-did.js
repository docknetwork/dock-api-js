const http = require('../utils/http-utils');

async function createDID(data){
    const result = await http.post('dids/', data);
    console.log(`Response: ${JSON.stringify(result.data)}`);
  return result.data;
}

module.exports = createDID;

