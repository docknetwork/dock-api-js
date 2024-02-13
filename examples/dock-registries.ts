import * as http from "../utils/http-utils";

/**
 * @name createRegistry
 * @description Creates a new registry with the given policy DID.
 *
 * @param policyDid - The DID of the policy to associate with the new registry.
 * @returns A promise that resolves to the created registry object.
 */
export async function createRegistry(policyDid: string) {
  const data = {
    addOnly: false,
    policy: [policyDid],
  };

  return http.sendAndLog(() => http.post("registries/", data));
}


/**
 * @name revoke
 * @description Revokes a credential from the registry with the given ID.
 *
 * @param registryId - The ID of the registry to revoke from.
 * @param credential - The credential object containing the ID to revoke.
 */
export async function revoke(registryId: string, credential: { id: string }) {
  const url = `registries/${registryId}`;

  const data = {
    action: "revoke",
    credentialIds: [credential.id],
  };

  return http.sendAndLog(() => http.post(url, data));
}

/**
 * @name unrevoke
 * @description Unrevokes a previously revoked credential from the registry with the given ID.
 *
 * @param registryId - The ID of the registry to unrevoke from.
 * @param credential - The credential object containing the ID to unrevoke.
 */
export async function unrevoke(registryId: string, credential: { id: string }) {
  const url = `registries/${registryId}`;

  const data = {
    action: "unrevoke",
    credentialIds: [credential.id],
  };

  return http.sendAndLog(() => http.post(url, data));
}
