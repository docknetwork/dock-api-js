const schemas = require('../examples/dock-schema');
const jobs = require('../examples/dock-jobs');
const dids = require('../examples/dock-did');

const schemaFlow = async () => {
  // Create a DID
  const createDID = await dids.createDID();
  const createResult = await schemas.createSchema(createDID.data.did);

  await jobs.waitForJobCompletion(createResult.id);

  // Retrieve the created Schema directly by hexID
  await schemas.getSchema(createResult.data.hexID);

  // Retrieve the created Schema directly id
  await schemas.getSchema(createResult.data.id);

  // Get all schemas associated with the authenticated user
  await schemas.listSchemas();
};

schemaFlow();
