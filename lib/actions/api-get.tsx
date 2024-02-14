const baseUrl = process.env.NEXT_PUBLIC_DOCK_API_URL as string;
const dock_api_key = process.env.NEXT_PUBLIC_DOCK_API_TOKEN as string;

interface ApiGetParams {
  relativeUrl: string;
  body?: object;
}

/**
 * Makes a GET request to the Dock API.
 *
 * @param relativeUrl - The relative URL path for the API endpoint.
 * @returns The JSON response data.
 * @throws Error if the request fails.
 */
export async function apiGet({ relativeUrl, body }: ApiGetParams) {
    const fullUrl = `${baseUrl}/${relativeUrl}`;

  const response = await fetch(fullUrl, {
    headers: {
      "DOCK-API-TOKEN": dock_api_key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    method: "GET",
  });

  console.log("response:", response);
  
  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} - ${data.message || JSON.stringify(data)}`
    );
  }


  return data;
}
