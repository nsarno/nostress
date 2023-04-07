import * as dotenv from 'dotenv'
dotenv.config()

import { start } from "./relay"

const port = parseInt(process.env.PORT || "3000")

start(port)