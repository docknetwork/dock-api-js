import { apiPost } from "@/lib/actions/api-post";

/**
 * An object containing credentials, with optional issuer.
 *
 * @param credential - The credential value.
 * @param issuer - An optional issuer of the credential.
 */
type CredentialProps = {
  credential: Credential;
};

export type Issuer = {
    name: string;
    image: string;
    did: string;
};

export type Credential = {
  id?: string;
  type: string[];
  subject: {
    id?: string;
    degree: {
      type: string;
      name: string;
    };
  };
  issuanceDate: string;
  expirationDate: string;
};

/**
 * Creates a credential with the provided credential data and issuer.
 * Sets the credential issuer ID to the provided issuer DID.
 * Wraps the credential in an object and sends an POST request to credentials/ to store it.
 * @returns A Promise that resolves to the credential data.
 */
export async function createCredential({
  credential
}: CredentialProps): Promise<Credential> {
  const wrapped = { credential };

  return await apiPost({
    relativeUrl: "credentials/", 
    body: wrapped
  });
};

/**
 * @name verifyCredential
 * @description Verifies a credential by sending it in a POST request to /verify/.
 *
 * @param credential - The credential to verify.
 * @returns A Promise that resolves to the verification result.
 */
export async function verifyCredential({
  credential,
}: CredentialProps): Promise<any> {
  return await apiPost({
    relativeUrl: "verify/", 
    body: credential
  });
};