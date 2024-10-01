const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3001; // Backend port

app.get('/', (req, res) => {
  res.send('Hello from the WebSocket backend!');
});

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Attach WebSocket upgrade request to the HTTP server
const server = app.listen(port, () => {
  console.log(`Express.js server listening on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});