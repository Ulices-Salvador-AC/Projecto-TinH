const { request, response } = require("express")
const Role = require('../models/role')


const administratorRole = async(req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "Se quiere validar el role sin validar el token primero"
        })
    }

    const {role, name} = req.user
    if (role !== "TEACHER_ROLE") {
        return res.status(401).json({
            msg: `El usuario ${name} con el role ${role} no esta autorizado para realizar esta petición`
        })
    }

    next()
}

const hasAValidRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: "Se quiere validar el role sin validar el token primero"
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `La petición requiere al menos uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    administratorRole,
    hasAValidRole
}