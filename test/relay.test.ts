import WebSocket, { WebSocketServer } from 'ws';
import { start, stop } from '../src/relay'
import { sendEvent } from '../src/client'

function waitForSocketState(socket : WebSocket, state : number) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve(true)
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    }, 5);
  });
}

describe("Relay", () => {
  const PORT = 3000
  let server : WebSocketServer

  beforeAll(() => {
    server = start(PORT)
  })

  afterAll(() => {
    stop(server)
  })

  test("allow connections", async () => {
    const addr = `ws://localhost:${PORT}`
    const ws = new WebSocket(addr)

    const event = '{"pubkey":"10f7c6aeb118e2c8d819e9be990b3b30fa8be23e64db48224f25bb52ecb20b97","content":"🧪","id":"25fd2fa39a8a6ee80750c1cdad5d5f4b57cf344d9e57d2e9cd9d1afaf081b981","created_at":1678815989,"sig":"2c0f9f7222cae6a5c800a5c381866be805760fc85164affb4a38a0d9d9162fdf15cb699584a649b44a188f74ca05580ff89684a2b98b6ab80297d548752f8365","kind":1,"tags":[]}'
    const event2 = '{"pubkey":"10f7c6aeb118e2c8d819e9be990b3b30fa8be23e64db48224f25bb52ecb20b97","content":"🧪","id":"04e59ffc2edec0f2a92fa777dcf4eeec40ae88148855dfad81ee49a3a46f9568","created_at":1678802969,"sig":"c84b50bcc5c60f9dee522aea4c2956b158eb71a339ea824cc1f8804cd6f8459df9ea0e7b01ee4174a63547871eb872f01c220b14f71a8eb4b803c5049d2070ac","kind":1,"tags":[]}'

    ws.on('error', function () {
      console.log(`Error connecting to ${addr}`)
    })

    ws.on('open', function () {
      sendEvent(ws, event)
      sendEvent(ws, event2)
      sendEvent(ws, "")

      ws.send(JSON.stringify(["EVENT"]))
      ws.send(JSON.stringify([]))
      ws.send("")
      ws.send("bad json")

      ws.close()
    })

    await waitForSocketState(ws, ws.CLOSED)
  })
})
