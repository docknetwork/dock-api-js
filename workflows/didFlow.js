const dids = require('../examples/dock-did');
const jobs = require('../examples/dock-jobs');

const didFlow = async () => {
  // Create a DID
  const createResult = await dids.createDID();

  await jobs.waitForJobCompletion(createResult.id);

  // Retrieve the created DID directly
  await dids.getDID(createResult.data.did);

  // Get all DIDs associated with the authenticated user
  await dids.listDIDs();

  // Delete DID
  await dids.deleteDID(createResult.data.did);
};

didFlow();
