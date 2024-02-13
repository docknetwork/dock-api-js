import { ActionResult } from "next/dist/server/app-render/types";

const baseUrl = process.env.NEXT_PUBLIC_DOCK_API_URL;

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
async function sendAndLog(asyncFunc: () => Promise<any>) {
  const result = await asyncFunc();
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
async function sendRequest({
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
async function post(relativeUrl: string, data: any) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  
  return sendRequest({
    fullUrl, 
    sendAction: "POST",
    actionFunc: async () => 
      await fetch(fullUrl, {
        method: "POST",
        headers: {
          "DOCK_API_TOKEN": process.env.NEXT_PUBLIC_DOCK_API_TOKEN as string,
          "Content-Type": "application/json",
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
async function patch(relativeUrl: string, data: any) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  
  return sendRequest({
    fullUrl, 
    sendAction: "PATCH", 
    actionFunc: async () => 
      await fetch(fullUrl, {
        method: "PATCH",
        headers: {
          "DOCK_API_TOKEN": process.env.NEXT_PUBLIC_DOCK_API_TOKEN as string,
          "Content-Type": "application/json",
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
async function callDelete(relativeUrl: string) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;

  return sendRequest({
    fullUrl,
    sendAction: "DELETE",
    actionFunc: async () =>
      await fetch(fullUrl, {
        method: "DELETE",
        headers: {
          "DOCK-API-TOKEN": process.env.NEXT_PUBLIC_DOCK_API_TOKEN as string,
          "Content-Type": "application/json",
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
async function get(relativeUrl: string, data?: any) {
  const fullUrl = `${baseUrl}/${relativeUrl}`;
  
  return sendRequest({
    fullUrl,
    sendAction: "GET",
    actionFunc: async () =>
      await fetch(fullUrl, {
        method: "GET",
        headers: {
          "DOCK-API-TOKEN": process.env.NEXT_PUBLIC_DOCK_API_TOKEN as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    });
}

export { post, get, patch, callDelete, sendAndLog };
