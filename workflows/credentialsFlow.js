const credentials = require('../examples/dock-credentials');
const dids = require('../examples/dock-did');
const schemas = require('../examples/dock-schema');
const jobs = require('../examples/dock-jobs');

const credentialBody = {
  type: [
    'Test-Credential',
  ],
  subject: {
    alumniOf: 'University of Roswell',
    degree: 'Bachelor of Fine Art',
  },
  issuanceDate: '2019-08-24T14:15:22Z',
  expirationDate: '2022-08-24T14:15:22Z',
  issuer: {},
};

const credentialsFlow = async () => {
  const holderDID = await dids.createDID();
  const issuerDID = await dids.createDID();

  // adding a schema is optional but if you are using one then the credential must satisfy it
  const schema = await schemas.createSchema(issuerDID.data.did);

  await jobs.waitForJobCompletion(schema.id);

  credentialBody.schema = schema.data.id;

  // Set the subject to be the holder
  credentialBody.subject.id = holderDID.data.did;

  const signedCredential = await credentials.createCredential(credentialBody, issuerDID);

  await credentials.verifyCredential(signedCredential);
};

credentialsFlow();
