import { apiPost } from "@/lib/actions/api-post";
import type { Credential } from "@/types/dock";


export async function getRegistry(id: string) {
  
}

export async function createRegistry(policyDid: string) {
  const data = {
    addOnly: false,
    policy: [policyDid],
  };

  try {
    const response: any = await apiPost({
      relativeUrl: "registries",
      body: data,
    });

    console.log("APIPOST response: ", response);

    return response;
  } catch (error) {
    console.error(error);
  }

  return undefined;
}

/**
 * @name revoke
 * @description Revokes a credential from the registry with the given ID.
 *
 * @param registryId - The ID of the registry to revoke from.
 * @param credential - The credential object containing the ID to revoke.
 */
export async function revoke(registryId: string, credential: Credential) {
  console.log("revoke:start:", { registryId, credential });

  const url = `registries/${registryId}`;

  const data = {
    action: "revoke",
    credentialIds: [credential.id],
  };
  try {
    const response = await apiPost({
      relativeUrl: url,
      body: data,
    });

    console.log("REVOKE APIPOST response: ", response);

    return response;
  } catch (error) {
    console.error("revoke:error", error);
  }

  return undefined;
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

  /* return http.sendAndLog(() => http.post(url, data)); */
}
