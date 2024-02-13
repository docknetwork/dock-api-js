import { createRegistry, revoke, unrevoke } from "../examples/dock-registries";
import { createCredential } from "../examples/dock-credentials";
import { waitForJobCompletion } from "../examples/dock-jobs";
import { createDID } from "../examples/dock-did";

interface CredentialToRevoke {
  type: string[];
  subject: {
    id: string;
    degree: {
      type: string;
      name: string;
    };
  };
  issuanceDate: string;
  expirationDate: string;
}

const credentialToRevoke: CredentialToRevoke = {
  type: ["Test-Credential"],
  subject: {
    id: "",
    degree: {
      type: "BachelorDegree",
      name: "Bachelor of Fine Arts",
    },
  },
  issuanceDate: "2019-08-24T14:15:22Z",
  expirationDate: "2022-08-24T14:15:22Z",
};

/**
 * Generates a verifiable credential with a randomly generated holder and issuer DID.
 * The credential is based on the credentialToRevoke template.
 */
export const generateCredential = async () => {
  const holderDID = await createDID({});
  const issuerDID = await createDID({});

  // Set the subject to be the holder
  credentialToRevoke.subject.id = holderDID.data.did;

  const credential = {
    issuer: issuerDID.data.did,
    credential: {
      ...credentialToRevoke,
    },
  };

  return createCredential(credential);
};

/**
 * Creates a registry, issues a credential, revokes the credential,
 * and then unrevokes the credential to demonstrate registry workflow.
 */
export const registryFlow = async () => {
  // create registry
  const policyDID = await createDID({});
  const registry = await createRegistry(policyDID.data.did);
  await waitForJobCompletion(registry.id);

  const credential = await generateCredential();

  // Revoke credential
  const revocation = await revoke(registry.data.id, credential);
  await waitForJobCompletion(revocation.id);

  // Un-Revoke credential
  const unrevocation = await unrevoke(registry.data.id, credential);
  await waitForJobCompletion(unrevocation.id);
};
