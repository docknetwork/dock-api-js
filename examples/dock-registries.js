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

module.exports = {
  createRegistry,
};
