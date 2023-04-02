import { start } from "./relay"

const port = parseInt(process.env.PORT || "3000")

start(port)