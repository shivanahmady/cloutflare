# CLOUTFLARE

> A NodeJS app on Google Cloud Platform (AppEngine). Integrated/optimized with CloudFlare/CloudFlare Workers.

### -- COMMANDS --

> `NPM INSTALL` > `NPM DEV` > `NPM DEBUG` > `NPM START`

### -- NOTES --

- CloudFlare Cloud Worker: `www.curl.clout.workers.dev`
- Clout Worker Route: `cloutflare.net/*`
- Subdomain: `clout.workers.dev`
- Request Header Added by Cloud Worker : `X-CLOUDFLARE-CURL-WORKER-ADDED`
- CloudFlare generated Origin CA certificate --> AppEngine
- Minimum TLS Version: (TLS 1.3)

### -- CONFIGURATIONS --

- HTTPS with strict HSTS policies (Active)
- End-to-End Encryption: GCP/CloudFlare (Active)
- Certificate Signature: Elliptic Curve Algorithms (Active)
- Argo Smart Routing (Enabled)
- Request Header: noredir (Omitted)

## A Brief Summary

The Node.JS app is deployed as a versioned container on Google App Engine(Cloud Storage Buckets). The app UI/UX is mobile-friendly & adaptable across-platforms.
The development of the working application was done using Node.JS using dependencies such as express and pug to streamline development, and equip the application with a template engine to render the interface for the front-end. The front-end of the application is designed to adapt across different devices and is mobile-friendly. Despite the implementation of of fairly simple logic to ensure all requests headers are forwarded back to the user when responding to requests, this Node.JS app is capable of more complex functionality due to the implementation of a scalable skeleton.

## Secured/Configured For End-To-End Encryption

The security implemented ensures all traffic is secured between the client and the server; with full, end-to-end encryption. Traffic is redirected to enforce HTTPS with strict HSTS policies to provide a high level of security. This also includes disabling connections from visitors with TLS version lower than 1.3.
The Cloudflare generated Origin CA certificate is installed on the app server on Google Cloud Platform; creating a complete encryption between GCP and CloudFlare with certificates using the Elliptic Curve algorithms. Lastly, the Root CA is trusted and verified and provided by Google Cloud Platform. Edge Certificates have also been provided to be in the pack to be listed and managed by Cloudflare.
Moreover, despite enabling the web application firewall, additional firewall rules are implemented on both CloudFlare and Google App Engine to provide more control of traffic, and implement filters to remove potential threats based on cookies, location, IP address, user agent, URI, etc. For example, increasing challenges to reduce bots, blocking based on reputation, blocking redirects based on cookie parameters, etc.

## Availability/Performance

The implementation include enabling Argo Smart Routing and Tiered Caching and insuring to configure health checks and browser monitoring. By configuring it to improve visibility and run monitoring to detect precise availability and latency, the application is positioned to ensure proper traffic flow from the origin server, and offers the capability to uncover insight about bottlenecks and data anomalies.
To optimize performance, the application is configured to minify front-end resources, resize/reformat images as well as tweak preloading/prefetching resources to prioritize the resource loading and mitigate performance bottlenecks in response time.

## The Cloud Worker

> `www.curl.clout.workers.dev`

The cloud worker is enabled to provide edge level handling of request and response traffic, and configuring conditions to redirect appropriate requests/generate responses/ create parallel requests/responses from the edge.

The curl cloud worker is implemented to get triggered by event listeners. Once triggered, the async functions provide the await to check if a curl request is made by specific agents. If so, curl requests are redirected to another page, and resolved by returning the response of the redirected site. Requests with the appropriate params (noredir) to can forbid redirection. During this case, the redirection will not be triggered.

In summary, if a user makes a curl command to parse the website, the cloud worker ensures a redirect is made and returns the response the the client.

Most importantly, The Cloud Worker also appends params to requests as they coming and can provide us a way to implement custom headers to all requests handled across the site and through its path. In our example, we have only appended the following request param key which is accessible via the www.cloutflare.net.

### Request Header Added via Cloud Worker:

> `X-CLOUDFLARE-CURL-WORKER-ADDED`
