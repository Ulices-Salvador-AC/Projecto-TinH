const { request, response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header("x-token")
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.secretPrivateKey)
        // Leer el usuario que corresponde al UID
        const user = await User.findById(uid)
        // Crear una nueva propedad en la REQ, para el Uid de propietario del token valido
        req.user = user

        // Validar que el usuario exista por su ID
        if (!user) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en DB"
            })
        }

        // Verificar que uid tenga el estado en true
        if (!user.state) {
            return res.status(401).json({
                msg: "Token no valido - usuario con estado false"
            })
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}

module.exports = {
    validateJWT
}