const dids = require('../examples/dock-did');
const jobs = require('../examples/dock-jobs');

const didFlow = async () => {
  // Create a DID
  const createResult = await dids.createDID();

  // Retrieve the created DID directly
  await dids.getDID(createResult.data.did);

  // Get all DIDs associated with the authenticated user
  await dids.listDIDs();

  await jobs.waitForJobCompletion(createResult.id);

  // Delete DID
  await dids.deleteDID(createResult.data.did);
};

didFlow();
