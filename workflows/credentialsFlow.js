const credentials = require('../examples/dock-credentials');
const dids = require('../examples/dock-did');
const schemas = require('../examples/dock-schema');

const credentialBody = {
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

const credentialsFlow = async () => {
  const holderDID = await dids.createDID();
  const issuerDID = await dids.createDID();

  // adding a schema is optional
  const schema = await schemas.createSchema(issuerDID.data.did);
  credentialBody.schema = schema.data.id;

  // Set the subject to be the holder
  credentialBody.subject.id = holderDID.data.did;

  await credentials.createCredential(credentialBody, issuerDID);
};

credentialsFlow();
