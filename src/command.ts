function parse(str: string) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return []
  }
}

function isEventTemplate(o: Object) : boolean {
  return (
    'kind' in o &&
    'tags' in o &&
    'content' in o &&
    'created_at' in o
  )
}

function isUnsignedEvent(o: Object) : boolean {
  return isEventTemplate(o) && (
    'pubkey' in o
  )
}

function isEvent(o: Object) : boolean {
  return isUnsignedEvent(o) && (
    'sig' in o &&
    'id' in o
  )
}

export default {
  parse,
  validate,
  isUnsignedEvent,
  isEvent
}
