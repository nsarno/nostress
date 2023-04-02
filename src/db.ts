import { Event } from "nostr-tools"

type DbIndex = { [key:string] : { [key:string] : Event } }

const _index : DbIndex = {}

function index() : DbIndex {
  return _index
}

function record(event : Event) {
  _index[event.pubkey] ||= {}
  _index[event.pubkey][event.id] = event
}

export default { record, index }