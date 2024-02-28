const mongoose = require("mongoose")

const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGOBD_ATLAS, {
            // useNewUrlParser:true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log("Conexion con base de datos exitosa")
    } catch (error) {
        console.log(error)
        throw new Error("Error durante la inicialización de la base de datos")
    }
}

module.exports = {
    dbConnection
}