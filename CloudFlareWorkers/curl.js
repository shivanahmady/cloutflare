const host = "https://developers.cloudflare.com";
const url = host + "/workers/about";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

// /**
//  * gatherResponse awaits and returns a response body as a string.
//  * Use await gatherResponse(..) in an async function to get the response body
//  * @param {Response} response
//  */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes("application/text")) {
    return await response.text();
  } else if (contentType.includes("text/html")) {
    return await response.text();
  } else {
    return await response.text();
  }
}

/**
 * Conditionals to handle requests (e.g. redirect url if request is made via curl command)
 * Adds custom header to all other requests made for tracking purposes.
 * @param {Request} request
 */
async function handleRequest(request) {
  const { headers } = request;
  const userAgent = headers.get("user-agent") || "";
  const nordir = headers.get("cf-nordir") || "false";

  if (userAgent.toLowerCase() == "curl" && nordir.toLowerCase() == "false") {
    console.info(">> cURL request processing..");
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    };
    const response = await fetch(url, init);
    const results = await gatherResponse(response);
    return new Response(results, init);
  }
  request = new Request(request);
  request.headers.set("X-CLOUDFLARE-CURL-WORKER-ADDED", "000000000000000000");
  return fetch(request);
}
