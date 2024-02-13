import * as http from "../utils/http-utils";

/**
 * @type TestDoc
 * @description Interface representing the schema for a test document.
 *
 * @property {string} description - The document description.
 * @property {number} docDate - The document date.
 * @property {string} linkedVideo - A video linked to the document.
 * @property {string} text - The document text.
 * @property {string} textSrc - The source of the document text.
 */
export type TestDoc = {
  description: string;
  docDate: number;
  linkedVideo: string;
  text: string;
  textSrc: string;
};

const testDoc: TestDoc = {
  description: "Dock Anchor Example",
  docDate: new Date().getTime(),
  linkedVideo: "http://example.com/some-video-that-probably-does-not-exist.mp4",
  text: "I worried too. My main concern was whether or not the anchor would hold, how much wind and waves could an eight pound Danforth endure?",
  textSrc: "http://www.boatdejour.com/the-storm-a-true-story/",
};

/**
 * @name createAnchor
 * @description Creates a new anchor by sending anchor data to the anchors API endpoint.
 *
 * @returns A promise that resolves with the API response when the anchor is created.
 */
export async function createAnchor() {
  const data = [testDoc];
  return http.sendAndLog(() => http.post("anchors/", data));
}

/**
 * @name getAnchor
 * @description Retrieves an anchor by its ID.
 *
 * @param anchorId - The ID of the anchor to retrieve.
 * @returns A Promise that resolves to the anchor data.
 */
export async function getAnchor(anchorId: string) {
  return http.sendAndLog(() => http.get(`anchors/${anchorId}`));
};