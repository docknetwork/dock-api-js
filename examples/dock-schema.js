const http = require('../utils/http-utils');

const testSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Dock Schema Example',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    alumniOf: {
      type: 'string',
    },
    degree: {
      type: 'string',
    },
  },
  required: ['alumniOf'],
  additionalProperties: false,
};

async function createSchema(did) {
  const data = testSchema;

  // Sign author property with DID hex value
  data.author = did;
  return http.sendAndLog(() => http.post('schemas/', data));
}

async function getSchema(hexId) {
  return http.sendAndLog(() => http.get(`schemas/${hexId}`));
}

async function listSchemas() {
  return http.sendAndLog(() => http.get('schemas/'));
}

module.exports = {
  createSchema,
  getSchema,
  listSchemas,
};
