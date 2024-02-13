import * as http from "../utils/http-utils";

interface VerifiableCredential {
  "@context": string[];
  id: string;
  type: string[];
  credentialSubject: object;
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialStatus?: object;
  proof: Proof;
}

interface Proof {
  type: string;
  proofPurpose: string;
  verificationMethod: string;
  created: string;
  proofValue: string;
}

interface Presentation {
  holder: string;
  challenge?: string;
  domain?: string;
  credentials: VerifiableCredential[];
}

interface PresentationResponse {
  "@context": string[];
  id: string;
  type: string[];
  verifiableCredential: VerifiableCredential[];
  proof: Proof[];
}

/**
 * @description Creates a new presentation by sending a POST request to the presentations API endpoint.
 *
 * @param presentation - The presentation data to send in the request body.
 * @returns A promise that resolves with the response from the API.
 */
export async function createPresentation(presentation: Presentation): Promise<PresentationResponse> {
  return http.sendAndLog(() => http.post("presentations/", presentation));
}

/**
 * @description Verifies a presentation by sending it in a POST request to the verify API endpoint.
 *
 * @param presentation - The presentation data to verify.
 * @returns A promise that resolves with the response from the API.
 */
export async function verifyPresentation(presentation: Presentation): Promise<any> { // The return type should be adjusted based on the API's verification response structure
  return http.sendAndLog(() => http.post("verify/", presentation));
}
