const http = require('../utils/http-utils');

async function createDID(data) {
  return http.sendAndLog(() => http.post('dids/', data));
}

async function getDID(id) {
  return http.sendAndLog(() => http.get(`dids/${id}`));
}

async function listDIDs() {
  return http.sendAndLog(() => http.get('dids'));
}

async function updateDID(did, body) {
  return http.sendAndLog(() => http.patch(`dids/${did}`, body));
}

async function deleteDID(did) {
  return http.sendAndLog(() => http.callDelete(`dids/${did}`));
}

module.exports = {
  createDID,
  getDID,
  listDIDs,
  updateDID,
  deleteDID,
};
