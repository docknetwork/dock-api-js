const credentials = require('../examples/dock-credentials');
const dids = require('../examples/dock-did');
const presentations = require('../examples/dock-presentations');
const idUtils = require('../utils/id-utils');

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
  issuer: {},
};

const credentialsFlow = async () => {
  const holderDID = await dids.createDID();
  const issuerDID = await dids.createDID();

  // Set the subject to be the holder
  credentialBody.subject.id = holderDID.data.did;

  const credential = await credentials.createCredential(credentialBody, issuerDID);

  const presentation = {
    challenge: idUtils.createGuid(),
    domain: 'dock.io',
    holder: holderDID.data.did,
    credentials: [
      credential,
    ],
  };

  const signedPresentation = await presentations.createPresentation(presentation);

  await presentations.verifyPresentation(signedPresentation);
};

credentialsFlow();
