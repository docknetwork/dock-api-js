import { createRegistry, revoke, /* unrevoke*/ } from "../examples/dock-registries";
import { Issuer, createCredential, Credential } from "../examples/dock-credentials";
import { waitForJobCompletion } from "../examples/dock-jobs";
const policyDid = process.env.NEXT_PUBLIC_ISSUER_DID as string;

const credentialToRevoke: Credential = {
  type: ["Test-Credential"],
  subject: {
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
  const holderDID = process.env.NEXT_PUBLIC_RECEIVER_DID as string;
 
  // Set the subject to be the holder
  credentialToRevoke.subject.id = holderDID;

  const credential = {
    credential: {
      ...credentialToRevoke,
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
  await waitForJobCompletion(registry?.id as string);
  
  console.log(`Created registry: ${registry?.data.id}`);

  const credential = await generateCredential();
  console.log("Created credential:", {data: credential});
  

  // Revoke credential
  if (!registry?.data.id) return;

  const revocation = await revoke(registry?.data.id as string, credential);
  await waitForJobCompletion(revocation.id);
  
  console.log(`Revoked credential: ${revocation}`);
  /* 
  
  // Un-Revoke credential
  const unrevocation = await unrevoke(registry.data.id, credential);

  // Fixed - add missing await
  await waitForJobCompletion(unrevocation.id);*/
};
