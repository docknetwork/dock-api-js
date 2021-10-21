const http = require('../utils/http-utils');

async function createCredential(credential, issuer) {
  credential.issuer.id = issuer.data.did;
  const wrapped = { credential };
  return http.sendAndLog(() => http.post('credentials/', wrapped));
}

async function verifyCredential(credential) {
  return http.sendAndLog(() => http.post('verify/', credential));
}

module.exports = {
  createCredential,
  verifyCredential,
};
