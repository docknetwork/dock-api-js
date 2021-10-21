const http = require('../utils/http-utils');

async function createPresentation(presentation) {
  return http.sendAndLog(() => http.post('presentations/', presentation));
}

async function verifyPresentation(presentation) {
  return http.sendAndLog(() => http.post('verify/', presentation));
}

module.exports = {
  createPresentation,
  verifyPresentation,
};
