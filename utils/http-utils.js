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

async function sendAndLog(asyncFunc) {
  const result = await asyncFunc();
  console.log(`Response: ${JSON.stringify(result.data)}`);

  return result.data;
}

async function sendRequest(fullUrl, sendAction, actionFunc) {
  try {
    console.log(`Sending ${sendAction} request to ${fullUrl}`);

    return await actionFunc();
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
  }
}

async function post(relativeUrl, data) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'POST', () => axios.post(fullUrl, data, axiosHeaders));
}

async function patch(relativeUrl, data) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'PATCH', () => axios.patch(fullUrl, data, axiosHeaders));
}

async function callDelete(relativeUrl) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'DELETE', () => axios.delete(fullUrl, axiosHeaders));
}

async function get(relativeUrl) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  return sendRequest(fullUrl, 'GET', () => axios.get(fullUrl, axiosHeaders));
}

module.exports = {
  post, get, patch, callDelete, sendAndLog,
};
