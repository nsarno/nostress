import { PrismaClient } from '@prisma/client'
import { Event } from "nostr-tools"

type DbIndex = { [key:string] : { [key:string] : Event } }

const _index : DbIndex = {}

function index() : DbIndex {
  return _index
}

async function save(event : Event) {
  _index[event.pubkey] ||= {}
  _index[event.pubkey][event.id] = event

  const prisma = new PrismaClient()

  const record = await prisma.event.create({
    data: {
      event_id: event.id,
      pubkey: event.pubkey,
      data: event
    }
  })

  return record
}

export default { save, index }