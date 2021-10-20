const http = require('../utils/http-utils');

async function createRegistry(policyDid) {
  const data = {
    addOnly: false,
    policy: [
      policyDid,
    ],
  };

  return http.sendAndLog(() => http.post('registries/', data));
}

async function revoke(registryId, credential) {
  const url = `registries/${registryId}`;

  const data = {
    action: 'revoke',
    credentialIds: [
      credential.id,
    ],
  };

  return http.sendAndLog(() => http.post(url, data));
}

async function unrevoke(registryId, credential) {
  const url = `registries/${registryId}`;

  const data = {
    action: 'unrevoke',
    credentialIds: [
      credential.id,
    ],
  };

  return http.sendAndLog(() => http.post(url, data));
}

module.exports = {
  createRegistry,
  revoke,
  unrevoke,
};
