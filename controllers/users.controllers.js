const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const User = require("../models/user");

const postUsers = async(req = request, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    
    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    // Guardar base de datos:
    await user.save();
    res.json({
        user
    })
}

const getUsers = async(req = request, res = response) => {
    const {starting = 0, ending = 10} = req.query

    const [total, users] = await Promise.all([
        User.countDocuments({state: true}),
        User.find({state: true})
            .skip(Number(starting))
            .limit(Number(ending))
    ])

    res.status(200).json({
        total,
        users
    })
}

const putUsers = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, password, google, email, ...sustraccion} = req.body;

    // Validar contra base de datos.
    if (password) {
        const salt = bcryptjs.genSaltSync()
        sustraccion.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, sustraccion)
    res.json({
        id,
        user,
        msg: "put API"
    })
}

const deleteUsers = async(req = request, res = response) => {
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id, {state: false})
    const authenticatedUser = req.user
    
    res.json({
        user,
        authenticatedUser
    })
}

module.exports = {
    postUsers,
    getUsers,
    putUsers,
    deleteUsers
}