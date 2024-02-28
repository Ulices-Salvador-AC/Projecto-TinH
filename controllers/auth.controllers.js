const {request, response} = require('express')
const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const { generateJwt } = require('../helpers/generate-jwt')

const login = async(req = request, res = response) => {
    const {email, password} = req.body

    try {
        // Verificar que el email exista.
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                msg: "El email/contraseña son incorrectos - email"
            })
        }

        // Verificar que el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: "El email/contraseña son incorrectos - state"
            })
        }

        // Verificar la contraseña
        const validatePassword = bcryptjs.compareSync(password, user.password)
        if (!validatePassword) {
            return res.status(400).json({
                msg: "El email/contraseña son incorrectos - password"
            })
        }
        // JWT

        const token = await generateJwt(user.id)

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Algo salio mal, contactar con el administrador"
        })
    }
}

module.exports = {
    login
}