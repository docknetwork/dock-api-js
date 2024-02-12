/**
 * @name createGuid
 * @description Generates a globally unique identifier (GUID) using the crypto.randomUUID() function.
 * @returns {string} The generated GUID.
 */
export function createGuid(): string {
  function p8(s?: boolean): string {
    const p = crypto.randomUUID();
    return p;
  }

  return p8() + p8(true) + p8(true) + p8();
};
