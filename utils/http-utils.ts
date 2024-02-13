import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_DOCK_API_URL as string;
const dock_api_key = process.env.NEXT_PUBLIC_DOCK_API_TOKEN as string;

// console.log("API:", dock_api_key);


/**
 * @name SendRequest
 * @description Interface for objects representing HTTP requests.
 *
 * @param fullUrl - { string }.
 * @param sendAction - { string }
 * @param actionFunc - { () => Promise<any> }
 */
type SendRequest = {
  fullUrl: string;
  sendAction: ("GET" | "POST" | "PATCH" | "DELETE");
  actionFunc: () => Promise<any>;
};

/**
 * @name sendAndLog
 * @description Sends a request to an asynchronous function and logs the response.
 * @param asyncFunc - The asynchronous function to be executed.
 * @returns A Promise that resolves to the data returned by the asynchronous function.
 */
export async function sendAndLog(asyncFunc: () => Promise<any>) {
  const result = await asyncFunc();
  console.log("Send and log response:", result);
  console.log(`Response: ${JSON.stringify(result.data)}`);

  return result.data;
};


/**
 * @name sendRequest
 * @description Sends an asynchronous request.
 *
 * @param fullUrl - The full URL to send the request to.
 * @param sendAction - A description of the request action to log.
 * @param actionFunc - The asynchronous function that performs the request.
 * @returns The result of the asynchronous request.
 */
export async function sendRequest({
  fullUrl,
  sendAction,
  actionFunc
}: SendRequest) {
  try {
    console.log(`Sending ${sendAction} request to ${fullUrl}`);

    return await actionFunc();
  } catch (err) {
    console.error(`Failed: ${err}`);
    return {};
  };
};


/**
 * @name post
 * @description Sends a POST request to the provided relative URL with the given data as the request body.
 *
 * @param relativeUrl - The relative URL path to send the POST request to
 * @param data - The data to include as the request body
 * @returns The response from the POST request
 */
export async function post(relativeUrl: string, data: any) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;

  // console.log("dock api key:", dock_api_key)
  console.log("executing POST..");
  return sendRequest({
    fullUrl, 
    sendAction: "POST",
    actionFunc: () => 
      fetch(fullUrl, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "DOCK-API-TOKEN": dock_api_key as string,
        },
        body: JSON.stringify(data),
      })
  });
};



/**
 * Sends a PATCH request to the specified relative URL with the provided data.
 * 
 * @param relativeUrl - The relative URL to send the PATCH request to.
 * @param data - The data to be sent in the request body.
 * @returns - A promise that resolves to the response of the PATCH request.
 */
export async function patch(relativeUrl: string, data: any) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  
  return sendRequest({
    fullUrl, 
    sendAction: "PATCH", 
    actionFunc: async () => 
      await fetch(fullUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "DOCK_API_TOKEN": dock_api_key,
        },
        body: JSON.stringify(data),
      })
  });
};


/**
 * @name callDelete
 * @description Sends a DELETE request to the provided relative URL.
 *
 * @param relativeUrl - The relative URL path to send the DELETE request to
 */
export async function callDelete(relativeUrl: string) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;

  return sendRequest({
    fullUrl,
    sendAction: "DELETE",
    actionFunc: async () =>
      await fetch(fullUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN":dock_api_key,
        },
      })
    });
}



/**
 * @name get
 * @description Sends a GET request to the specified relative URL with the provided data.
 *
 * @param relativeUrl - The relative URL path to send the request to
 * @param data - { Optional } - The data to send in the request body
 * @returns The response promise after sending the GET request
 */
export async function get(relativeUrl: string, data?: any) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  
  return sendRequest({
    fullUrl,
    sendAction: "GET",
    actionFunc: async () =>
      await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "DOCK-API-TOKEN": dock_api_key,
        },
      })
    });
};