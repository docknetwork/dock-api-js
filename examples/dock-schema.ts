import * as http from '../utils/http-utils';

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

/**
 * Creates a schema with the given DID as the author.
 * Sends a POST request to /schemas/ with the schema data.
 * Logs the request and handles errors.
 */
export async function createSchema(did: string) {
  const data = { ...testSchema, author: did };

  return await http.sendAndLog(() => http.post("schemas/", data));
};

/**
 * Gets a schema by its hex ID.
 * Sends a GET request to /schemas/{hexId} to retrieve the schema.
 * Logs the request and handles errors.
 */
export async function getSchema(hexId: string) {
  return await http.sendAndLog(() => http.get(`schemas/${hexId}`));
}

/**
 * Gets a list of all schemas.
 * Sends a GET request to /schemas/ and returns the response.
 * Logs the request and handles errors.
 */
export async function listSchemas() {
  return await http.sendAndLog(() => http.get("schemas/"));
}
