import * as http from "../utils/http-utils";

interface DIDCreationResponse {
  id: string;
  data: {
    did: string;
    hexDid: string;
    controller: string;
  };
}

interface DIDDocument {
  "@context": string;
  id: string;
  authentication: string[];
  assertionMethod: string[];
  publicKey: PublicKey[];
}

interface PublicKey {
  id: string;
  type: string;
  controller: string;
  publicKeyBase58: string;
}

interface DIDListResponse {
  [index: number]: DIDDocument;
}

interface GenericResponse {
  id: string;
  data: any;
}

/**
 * @description Creates a new DID (Decentralized Identifier).
 * 
 * @param data - The DID (Decentralized Identifier) data.
 * @returns A Promise that resolves to the DID (Decentralized Identifier) data.
 */
export async function createDID(data: object): Promise<DIDCreationResponse> {
  return http.sendAndLog(() => http.post("dids/", data));
}

/**
 * @description Gets a DID (Decentralized Identifier) by ID.
 * 
 * @param id - The DID (Decentralized Identifier) ID.
 * @returns A Promise that resolves to the DID (Decentralized Identifier) data.
 */
export async function getDID(id: string): Promise<DIDDocument> {
  return http.sendAndLog(() => http.get(`dids/${id}`));
}

/**
 * @description Gets a list of all DIDs (Decentralized Identifiers).
 * 
 * @returns A Promise that resolves to the list of DID (Decentralized Identifier) data.
 */
export async function listDIDs(): Promise<DIDListResponse> {
  return http.sendAndLog(() => http.get("dids"));
}

/**
 * @description Updates an existing DID (Decentralized Identifier) by ID.
 * 
 * @param did - The DID (Decentralized Identifier) ID.
 * @param body - The DID (Decentralized Identifier) data.
 * @returns A Promise that resolves to the updated DID (Decentralized Identifier) data.
 */
export async function updateDID(did: string, body: object): Promise<GenericResponse> {
  return http.sendAndLog(() => http.patch(`dids/${did}`, body));
}

/**
 * @description Deletes a DID (Decentralized Identifier) by ID.
 * 
 * @param did - The DID (Decentralized Identifier) ID.
 * @returns A Promise that resolves to the deleted DID (Decentralized Identifier) data.
 */
export async function deleteDID(did: string): Promise<GenericResponse> {
  return http.sendAndLog(() => http.callDelete(`dids/${did}`));
}
