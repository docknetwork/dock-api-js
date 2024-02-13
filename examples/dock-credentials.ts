import * as http from "../utils/http-utils";

/**
 * An object containing credentials, with optional issuer.
 *
 * @param credential - The credential value.
 * @param issuer - An optional issuer of the credential.
 */
type CredentialProps = {
  credential: any;
  issuer: any;
};

/**
 * Creates a credential with the provided credential data and issuer.
 * Sets the credential issuer ID to the provided issuer DID.
 * Wraps the credential in an object and sends an HTTP POST request to /credentials/ to store it.
 * @returns A Promise that resolves to the credential data.
 */
export async function createCredential({
  credential,
  issuer,
}: CredentialProps) {
  credential.issuer.id = issuer?.data.did;
  const wrapped = { credential };
  return http.sendAndLog(() => http.post("credentials/", wrapped));
};

/**
 * @name verifyCredential
 * @description Verifies a credential by sending it in a POST request to /verify/.
 *
 * @param credential - The credential to verify.
 * @returns A Promise that resolves to the verification result.
 */
export async function verifyCredential({ credential }: CredentialProps) {
  return http.sendAndLog(() => http.post("verify/", credential));
};