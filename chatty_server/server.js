// server.js
const express = require('express');
const SocketServer = require('ws').Server;

const app = express();

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
 
    wss.broadcast(message);

    console.log('received: ', JSON.parse(message));

  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // 
  ws.on('close', () => console.log('Client disconnected'));
});

