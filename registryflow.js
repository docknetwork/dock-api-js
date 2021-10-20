const registries = require('./examples/dock-registries');
const credentials = require('./examples/dock-credentials');
const jobs = require('./examples/dock-jobs');
const dids = require('./examples/dock-did');

const credentialToRevoke = {
  type: [
    'Test-Credential',
  ],
  subject: {
    degree: {
      type: 'BachelorDegree',
      name: 'Bachelor of Fine Arts',
    },
  },
  issuanceDate: '2019-08-24T14:15:22Z',
  expirationDate: '2022-08-24T14:15:22Z',
};

const createCredential = async () => {
  const holderDID = await dids.createDID();
  const issuerDID = await dids.createDID();

  // Set the subject to be the holder
  credentialToRevoke.subject.id = holderDID.data.did;

  return credentials.createCredential(credentialToRevoke, issuerDID);
};

const registryFlow = async () => {
  // create registry
  const policyDID = await dids.createDID();
  const registry = await registries.createRegistry(policyDID.data.did);
  await jobs.waitForJobCompletion(registry.id);

  const credential = await createCredential();

  // Revoke credential
  const revocation = await registries.revoke(registry.data.id, credential);
  await jobs.waitForJobCompletion(revocation.id);

  // Un-Revoke credential
  const unrevocation = await registries.unrevoke(registry.data.id, credential);
  await jobs.waitForJobCompletion(unrevocation.id);
};

registryFlow();
