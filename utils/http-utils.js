const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

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
  }
}

async function patch(relativeUrl, data) {
  try {
    const fullUrl = `${baseUrl}/${relativeUrl}`;
    console.log(`Patching request to ${fullUrl}`);

    return await axios.patch(fullUrl, data, axiosHeaders);
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
  }
}

async function callDelete(relativeUrl) {
  try {
    const fullUrl = `${baseUrl}/${relativeUrl}`;
    console.log(`Deleting ${fullUrl}`);

    return await axios.delete(fullUrl, axiosHeaders);
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
  }
}

async function get(relativeUrl) {
  try {
    const fullUrl = `${baseUrl}/${relativeUrl}`;
    console.log(`Getting data from ${fullUrl}`);

    return await axios.get(fullUrl, axiosHeaders);
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
  }
}

module.exports = {
  post, get, patch, callDelete,
};
