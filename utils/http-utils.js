const axios = require('axios');

const baseUrl = process.env.API_URL;
const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
};

async function post(relativeUrl, data) {
  try {
    const fullUrl = `${baseUrl}/${relativeUrl}`;
    console.log(`Posting request to ${fullUrl}`);

    return await axios.post(fullUrl, data, axiosHeaders);
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
    // throw err;
  }
}

module.exports = { post };
