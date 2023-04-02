import WebSocket from 'ws';

export function sendEvent(ws: WebSocket, event: string) {
  ws.send(JSON.stringify(["EVENT", event]))
}

export function connect(addr: string) {
  const ws = new WebSocket(addr);

  ws.on('error', console.error);
  
  ws.on('open', function open() {
    ws.send('client says hello');
  });
  
  ws.on('message', function message(data) {
    console.log('client received: %s', data);
  });
}
