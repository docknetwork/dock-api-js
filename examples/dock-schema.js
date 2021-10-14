const http = require('../utils/http-utils');

const testSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Dock Schema Example',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    emailAddress: {
      type: 'string',
      format: 'email',
    },
    alumniOf: {
      type: 'string',
    },
  },
  required: ['emailAddress', 'alumniOf'],
  additionalProperties: false,
};

async function createSchema(didHexId) {
  const data = testSchema;

  // Sign author property with DID hex value
  data.author = didHexId;
  return http.sendAndLog(() => http.post('schemas/', data));
}

async function getSchema(id) {
  return http.sendAndLog(() => http.get(`schemas/${id}`));
}

async function listSchemas() {
  return http.sendAndLog(() => http.get('schemas/'));
}

module.exports = {
  createSchema,
  getSchema,
  listSchemas,
};
