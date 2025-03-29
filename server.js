import { WebSocketServer } from 'ws';
import * as Y from 'yjs';
import { setupWSConnection } from 'y-websocket/bin/utils';

const wss = new WebSocketServer({ 
  port: 1234,
  path: "/",
  perMessageDeflate: false
});

wss.on('connection', (conn, req) => {
  console.log('New connection established');
  setupWSConnection(conn, req, {
    docName: req.url?.slice(1) || 'default',
    gc: true
  });
});

wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

wss.on('listening', () => {
  console.log('WebSocket server running on port 1234');
});