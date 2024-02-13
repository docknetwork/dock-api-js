import { createRegistry, revoke, /* unrevoke*/ } from "../examples/dock-registries";
import { Issuer, createCredential } from "../examples/dock-credentials";
import { waitForJobCompletion } from "../examples/dock-jobs";
import { createGuid } from "../utils/id-utils";
const policyDid = process.env.NEXT_PUBLIC_ISSUER_DID as string;

interface CredentialToRevoke {
  id: string;
  type: string[];
  subject: {
    id: string;
    degree: {
      type: string;
      name: string;
    };
  };
  issuer: Issuer;
  issuanceDate: string;
  expirationDate: string;
}

const credentialToRevoke: CredentialToRevoke = {
  id: "123456789",
  type: ["Test-Credential"],
  subject: {
    id: " ",
    degree: {
      type: "BachelorDegree",
      name: "Bachelor of Fine Arts",
    },
  },
  issuer: {
      name: "Test Issuer",
      image: "https://example.com/issuer.png",
      did: " ",
  },
  issuanceDate: "2019-08-24T14:15:22Z",
  expirationDate: "2022-08-24T14:15:22Z",
};

/**
 * Generates a verifiable credential with a randomly generated holder and issuer DID.
 * The credential is based on the credentialToRevoke template.
 */
export const generateCredential = async () => {
  const holderDID = process.env.NEXT_PUBLIC_RECEIVER_DID as string;
  const issuerDID = process.env.NEXT_PUBLIC_ISSUER_DID as string;

  // Set the subject to be the holder
  credentialToRevoke.subject.id = holderDID;

  const credential = {
    credential: {
      ...credentialToRevoke,
      issuer: {
        ...credentialToRevoke.issuer,
        did: issuerDID,
      },
    },
  };
  console.log("This is the credential: ", credential);

  return createCredential(credential);
};

/**
 * Creates a registry, issues a credential, revokes the credential,
 * and then unrevokes the credential to demonstrate registry workflow.
 */
export const registryFlow = async () => {
  console.log("Starting registry flow");

  // create registry
  const registry = await createRegistry(policyDid);
  console.log(`Created registry: ${registry?.data.id}`);

  await waitForJobCompletion(registry?.id as string);

  const credential = await generateCredential();
  console.log(`Created credential: ${credential}`);
  
  // Revoke credential
  const revocation = await revoke(registry?.data.id as string, credential);
  console.log(`Revoked credential: ${revocation}`);
  
  /* 
  await waitForJobCompletion(revocation.id);
  
  // Un-Revoke credential
  const unrevocation = await unrevoke(registry.data.id, credential);

  // Fixed - add missing await
  await waitForJobCompletion(unrevocation.id);*/
};
