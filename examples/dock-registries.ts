import { apiPost } from "@/lib/actions/api-post";
import { Credential } from "./dock-credentials";


export type CreateRegistryResponse = {
  id: string;
  data: {
    id: string;
    policy: {
      type: string;
      policy: string[];
      addOnly: boolean;
    };
    type: string;
  };
};



export async function createRegistry(
  policyDid: string
) {

  const data = {
    addOnly: true,
    policy: [policyDid],
  };

  try {
    const response: CreateRegistryResponse = await apiPost({
      relativeUrl: 'registries', 
      body: data
    });
  
    console.log("APIPOST response: ", response); 

    return response;
    
  } catch (error) {
    console.error(error); 
  };

  return undefined;
};


/**
 * @name revoke
 * @description Revokes a credential from the registry with the given ID.
 *
 * @param registryId - The ID of the registry to revoke from.
 * @param credential - The credential object containing the ID to revoke.
 */
export async function revoke(registryId: string, credential: Credential) {
  const url = `registries/${registryId}`;

  const data = {
    action: "revoke",
    credentialIds: [credential],
  };
  try {
    const response = await apiPost({
      relativeUrl: url, 
      body: data
    });
  
    console.log("REVOKE APIPOST response: ", response); 

    return response;

  } catch (error) {
    console.error(error); 
  };

  return undefined;
};

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
