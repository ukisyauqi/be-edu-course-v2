
import express, { urlencoded, json } from "express"
import cors from "cors"
import router from "./routes/router.js"
import { SERVER_PORT } from "./constants.js"


const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

app.use(cors({ origin: true, credentials: true }))

app.use("/", router)

app.listen(SERVER_PORT, () => {
  console.log("Server Running")
})
