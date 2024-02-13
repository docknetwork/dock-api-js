const baseUrl = process.env.NEXT_PUBLIC_DOCK_API_URL as string;
const dock_api_key = process.env.NEXT_PUBLIC_DOCK_API_TOKEN as string;

interface ApiPostParams {
  relativeUrl: string;
  body: object;
}

/**
 * Makes a POST request to the Dock API.
 *
 * @param relativeUrl - The relative URL path for the API endpoint.
 * @param body - The request body to send.
 * @returns The JSON response body.
 * @throws Error if the request fails.
 */
export async function apiPost({ relativeUrl, body }: ApiPostParams) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  
  const result = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "DOCK-API-TOKEN": dock_api_key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`API Error: ${result.status} - ${errorText}`);
  }

  return result.json();
}
