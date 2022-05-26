# Service Bindings sample

Sample for using Service Bindings for Cloudflare Workers.

## motivation

[Remix](https://remix.run/) is a framework that runs on Cloudflare Workers. Remix + Cloudflare Workers is a great combination that can run on edge computing. However, to actually build the application, the details are a bit of a challenge.

1. Remix is SSR'd but you always have to pay the cost to generate it.

There are two renderings in Remix, in SSR and CSR. SSR always has to pay the processing costs on the back end. However, in real applications, content is often not updated frequently. So implementing the process to render on Cloudflare Workers to perform SSR every time is wasteful in terms of server resources and may have a negative impact on the response to users.
Cloudflare solves this by using the recently announced [Service Bindings](https://blog.cloudflare.com/service-bindings-ga/). Of course, it is possible to solve this problem without using Service Bindings, but it makes sense to use Service Bindings to isolate each other's responsibilities, like the relationship between a web server and an application.

```
(usr)
Browser          (rendering HTML)
  👇               👆
Web Server       (save cache)
  👇               👆
Application  👉  (generate HTML)
(server)
```

This repository shows a sample realization using Cloudflare Workers' Service Bindings for the web server and Remix to implement the above configuration.

2. Adding many Libraries and codes will increase Remix bundle size

The initial build size of a Remix project is not large enough to be a concern. However, as development progresses, the size will gradually increase with additional libraries and code. The default file size that can be deployed to Cloudflare Workers must be less than 1 MB. Service Bindings can also be used to solve the size limitation issue by splitting the Remix into multiple Workers.

This repository uses [remix-service-bindings](https://github.com/aiji42/remix-service-bindings) to separate one Remix application from two Cloudflare Workers.
