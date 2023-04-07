import { WebSocketServer } from 'ws'
import { Event, validateEvent, verifySignature } from 'nostr-tools'

import command from './command'
import db from './db'

function storeEvent(event: Event) {
  if (validateEvent(event) && verifySignature(event)) {
    db.save(event)
    console.log(db.index())
  } else {
    console.log('invalid event rejected')
  }
}

function handleEvent(cmd : Array<any>) {
  if (cmd[1] instanceof Object) {
    if (command.isEvent(cmd[1])) {
      storeEvent(cmd[1])
    }
  }
}

export function start(port: number) : WebSocketServer {
  const wss = new WebSocketServer({ port });

  wss.on('listening', () => {
    console.log(`listening on port ${port}`)
  })

  wss.on('connection', function (ws: WebSocketServer) {
    ws.on('error', console.error)
  
    ws.on('message', function (data) {
      console.log(`received: ${data}`)

      const cmd = command.parse(data.toString())

      switch (cmd[0]) {
        case 'EVENT':
          handleEvent(cmd)
      }
    })
  })

  return wss
}

export function stop(wss : WebSocketServer) {
  wss.close()
}
