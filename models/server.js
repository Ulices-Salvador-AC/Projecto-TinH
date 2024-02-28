const express = require("express")
const cors = require("cors")
const { dbConnection } = require("../database/config")

class Server {
    constructor(){
        this.app = express()
        this.cors = cors()
        this.port = process.env.PORT || 8080
        // Database
        this.databaseConnection()
        // Middlewares
        this.middlewares()
        // routes
        this.routes()
    }

    async databaseConnection(){
        await dbConnection();
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
        this.app.use("/api/auth", require("../routes/auth.routes"))
        this.app.use("/api/users", require("../routes/users.routes"))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Ejecutando en puerto http://localhost: ${this.port}`)
        })
    }
}

module.exports = Server