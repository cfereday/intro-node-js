const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


const findAssetAsync = (name) => {
  const assetPath = path.join(__dirname, 'assets', name);
  return new Promise((resolve, reject) => {
        fs.readFile(assetPath, {encoding: 'utf-8'}, (err, asset) => {
          if (err) {
            reject(err);
          }

          if (asset) {
            resolve(asset);
          }
        })
      }
  );
};

const hostname = '127.0.0.1';
const port = 3000;

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status);

const getTheAssets = async (method, route, res, name, status) => {
  try {
    res.writeHead(status, {'Content-Type': 'text/html'});
    const assets = await findAssetAsync(name);
    res.write(assets);
    logRequest(method, route, status);
    return res.end;
  } catch (err) {
    console.log('Something went wrong:', err);
    res.writeHead(500, {'Content-Type': 'text/html'});
    const assets = await findAssetAsync('sorry-something-went-wrong.html');
    res.write(assets);
    logRequest(method, route, 500);
    return res.end;
  }
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const route = url.parse(req.url).pathname;
  // this is sloppy, especially with more assets, create a "router"
  if (route === '/') {
    return getTheAssets(method, route, res, 'index.html', 200);
  }

  if (route !== '/') {
    return getTheAssets(method, route, res, 'page-not-found.html', 404)
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
