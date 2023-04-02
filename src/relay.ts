import { WebSocketServer } from 'ws'
import { validateEvent, verifySignature } from 'nostr-tools'

import Cmd from './cmd'
import db from './db'

function storeEvent(message: string) {
  const event = JSON.parse(message)

  if (validateEvent(event) && verifySignature(event)) {
    db.record(event)
    console.log(db.index())
  } else {
    console.log('invalid event rejected')
  }
}

export function start(port: number = 8080) : WebSocketServer {
  const wss = new WebSocketServer({ port });

  wss.on('listening', () => {
    console.log(`listening on port ${port}`)
  })

  wss.on('connection', function (ws: WebSocketServer) {
    ws.on('error', console.error)
  
    ws.on('message', function (data) {
      const cmd = Cmd.parse(data.toString())

      if (Array.isArray(cmd) && Cmd.validate(cmd)) {
        switch (cmd[0]) {
          case 'EVENT':
            if (cmd[1]) {
              storeEvent(cmd[1])
            }
        }
      }
    })
  })

  return wss
}

export function stop(wss : WebSocketServer) {
  wss.close()
}
