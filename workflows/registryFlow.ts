import {
  createRegistry,
  revoke /* unrevoke*/,
} from "../examples/dock-registries";
import { createCredential } from "../examples/dock-credentials";
import { waitForJobCompletion } from "../examples/dock-jobs";
import { Credential } from "@/types/dock";
import type { DidDock } from "@/types/dock";
const issuerDid = process.env.NEXT_PUBLIC_ISSUER_DID as DidDock;
const holderDID = process.env.NEXT_PUBLIC_RECEIVER_DID as string;

const credentialToRevoke: Credential = {
  type: ["VerifiableCredential", "ForSurBiometric"],
  issuer: issuerDid,
  subject: {
    id: holderDID,
    biometric: {
      id: "123456",
      created: new Date().toISOString(),
      data: new Date().toISOString(),
    },
  },
  issuanceDate: "2019-08-24T14:15:22Z",
};

/**
 * Creates a registry, issues a credential, revokes the credential,
 * and then unrevokes the credential to demonstrate registry workflow.
 */
export const registryFlow = async () => {
  console.log("Starting registry flow");

  // create registry
  const registry = await createRegistry(issuerDid);
  if (!registry)
    return console.log("registryFlow:registry:error", { registry });

  await waitForJobCompletion(registry.id);

  console.log(`Created registry:`, { registry });
  // To link the revocation registry to the credential set the status 
  // field in the Credential body to the registry.id value.
  credentialToRevoke.status = registry.data.id;
  // create credential
  const credential = await createCredential(credentialToRevoke);
  console.log("Created credential:", { credential });
  // Revoke credential
  if (!credential)
    return console.log("registryFlow:credential:error", { credential });

  const revocation = await revoke(registry.data.id, credential);
  if (!revocation)
    return console.log(`registryFlow:revocation:error`, { revocation });

  await waitForJobCompletion(revocation.id);
  console.log(`Revoked credential: ${revocation}`);

  /* 
  
  // Un-Revoke credential
  const unrevocation = await unrevoke(registry.data.id, credential);

  // Fixed - add missing await
  await waitForJobCompletion(unrevocation.id);*/
};
