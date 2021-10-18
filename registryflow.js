const registries = require('./examples/dock-registries');
const jobs = require('./examples/dock-jobs');
const dids = require('./examples/dock-did');

const registryFlow = async () => {
  const policyDID = await dids.createDID();

  const registry = await registries.createRegistry(policyDID.data.did);

  await jobs.waitForJobCompletion(registry.id);
};

registryFlow();
