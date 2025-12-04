#!/usr/bin/env node
// Simple log server that accepts POST /client-log and prints messages to the terminal
// Run: node tools/log-server.js

import http from 'http';
const port = process.env.LOG_SERVER_PORT || 4001;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/client-log') {
    let raw = '';
    req.on('data', chunk => raw += chunk);
    req.on('end', () => {
      try {
        const obj = JSON.parse(raw);
        const { level = 'log', payload, ts } = obj || {};
        const time = ts ? new Date(ts).toISOString() : new Date().toISOString();
        try {
          const line = `[CLIENT][${level.toUpperCase()}] ${time} — ` + (typeof payload === 'string' ? payload : JSON.stringify(payload));
          if (level === 'error') console.error(line);
          else if (level === 'warn') console.warn(line);
          else if (level === 'info') console.info(line);
          else console.log(line);
        } catch (e) {
          console.log('[CLIENT] (failed to pretty print payload)', payload);
        }
      } catch (e) {
        console.error('Invalid JSON payload from client-log:', e && e.message);
      }
      res.writeHead(204);
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Client log server listening on http://localhost:${port}`);
});
