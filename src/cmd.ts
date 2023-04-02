function parse(str: string) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return []
  }
}

function validate(cmd: Array<string>) : boolean {
  return cmd.length > 1
}

export default {
  parse,
  validate
}
