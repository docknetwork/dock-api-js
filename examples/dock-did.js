const http = require('../utils/http-utils');

async function sendAndLog(asyncFunc) {
  const result = await asyncFunc();
  console.log(`Response: ${JSON.stringify(result.data)}`);

  return result.data;
}

async function createDID(data) {
  return sendAndLog(() => http.post('dids/', data));
}

async function getDID(id) {
  return sendAndLog(() => http.get(`dids/${id}`));
}

async function listDIDs() {
  return sendAndLog(() => http.get('dids/'));
}

async function updateDID(did, body) {
  return sendAndLog(() => http.patch(`dids/${did}`, body));
}

async function deleteDID(did) {
  return sendAndLog(() => http.callDelete(`dids/${did}`));
}

module.exports = {
  createDID,
  getDID,
  listDIDs,
  updateDID,
  deleteDID,
};
