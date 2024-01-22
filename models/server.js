const express = require("express")
const cors = require("cors")

class Server {
    constructor(){
        this.app = express()
        this.cors = cors()
        this.port = process.env.PORT || 8080
        // Middlewares
        this.middlewares()
        // routes
        this.routes()
    }

    middlewares(){
        // Control de cors
        this.app.use(cors())
        // Directorio publico
        this.app.use(express.static("public"))
        // Parseo y lectura del body
        this.app.use(express.json())
    }

    routes(){
        this.app.use("/api/users", require("../routes/users.routes"))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Ejecutando en puerto http://localhost: ${this.port}`)
        })
    }
}

module.exports = Server