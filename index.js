import http from "node:http"
import express from "express"
import path from "path"

import{ Server } from "socket.io"

export async function main(){
    const app = express()
    app.use(express.static(path.resolve("./public")))
    
    const server = http.createServer(app)
    
    const io = new Server() 
    io.attach(server)  

    io.on("connection", (socket) => {
    console.log("a new socket is connected", socket.id)

    socket.on("message", (message) => {
        console.log("message from chat UI:", message)
        io.emit("message", message)
    })

    socket.on("user:typing", () => {
        socket.broadcast.emit("server:typing");
    })
})

    server.listen(9000 , () => {
        console.log(`server is listening on port 9000`)
    })

}
main()
