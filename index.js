"use strict";

const express = require("express");
const fetch = require("node-fetch");

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Proxy All Requests
app.get("*", async (req, res) => {
  let urlToProxy = req.query.proxy_url
    ? decodeURIComponent(req.query.proxy_url)
    : false;

  console.log(req.query.proxy_url);
  console.log(urlToProxy);
  if (!urlToProxy) {
    return res.status(400).send("Bad Request");
  }

  // Extract protocol and domain from URL to proxy
  const domainMatches = urlToProxy.match(
    /^(https?):\/\/([^\/?#]+)(?:[\/?#]|$)/i
  );
  const protocol = domainMatches[1];
  const domain = domainMatches[2];

  try {
    const response = await fetch(urlToProxy, {
      method: "GET",
      headers: {
        "Cache-Control": "max-age=0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.8",
      },
    });
    let body = await response.text();

    // Process body as in the original code...
    body = body.replace(
      /<meta(.*)http-equiv=["']X-FRAME-OPTIONS["'](.*)\/?>/gi,
      ""
    );
    // Continue with replacements...

    res.send(body);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
