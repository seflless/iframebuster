# Frame Buster

# About

A small, simple (and hacky) proxy server used to:

- remove X-Frame-Options headers
- remove frame busters
- bypass real-browser detection (sites that prevent curl for example)
- rewrite the HTML to not be relative ("/image.jpg") and instead be absolute ("http://www.site.com/image.jpg")

# Example

1. Start Proxee HTTP Server with `node server.js`
2. Navigate to [http://localhost:3000/?proxy_url=https://capitalizemytitle.com](http://localhost:3000/?proxy_url=https://capitalizemytitle.com)

3. See how iframing works with and without Proxee

# Issues

Each site is different so there are lots of improvements that can be made.  
If you find a broken site or have a suggestion, [please create an issue here.](https://github.com/ryanlelek/proxee/issues)
