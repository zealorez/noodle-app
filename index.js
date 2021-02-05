import { createServer } from 'http';
import { readFile } from 'fs';
import path from 'path'

const PORT = process.argv[2];

const whenIncomingRequest = (request, response) => {
  console.log('request url', request.url);

  var filePath = '.' + request.url;
  if (filePath === './') {
    filePath = './index.html'
  }

  const extname = path.extname(filePath)
  const mimetypes = {
    '.html': 'text/html',
    '.ico': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    ".mp3": "audio/mpeg",
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  }
  const contentType = mimetypes[extname]
  console.log(`I am extention name: ${extname}`)
  console.log(`I am content type: ${contentType}`)
  readFile(filePath, (error, content) => {
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content, 'utf-8');
  });
};

createServer(whenIncomingRequest).listen(PORT)
