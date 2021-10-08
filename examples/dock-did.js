const http = require('../utils/http-utils');

async function createDID(data) {
  const result = await http.post('dids/', data);
  console.log(`Response: ${JSON.stringify(result.data)}`);
  return result.data;
}

async function getDID(id) {
  const result = await http.get(`dids/${id}`);
  console.log(`Response: ${JSON.stringify(result.data)}`);
  return result.data;
}

async function listDIDs() {
  const result = await http.get('dids/');
  console.log(`Response: ${JSON.stringify(result.data)}`);
  return result.data;
}

async function updateDID(did, body) {
  const result = await http.patch(`dids/${did}`, body);
  console.log(`Response: ${JSON.stringify(result.data)}`);
  return result.data;
}

async function deleteDID(did) {
  const result = await http.callDelete(`dids/${did}`);
  console.log(`Response: ${JSON.stringify(result.data)}`);
  return result.data;
}

module.exports = {
  createDID,
  getDID,
  listDIDs,
  updateDID,
  deleteDID,
};
