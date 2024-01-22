const { request, response } = require("express")

const postUsers = (req = request, res = response) => {
    const {} = req.body
    res.json({
        msg: "post API"
    })
}

const getUsers = (req = request, res = response) => {
    const {starting, ending} = req.query
    res.json({
        starting, 
        ending,
        msg: "get API"
    })
}

const putUsers = (req = request, res = response) => {
    const {id} = req.params.id
    res.json({
        id,
        msg: "put API"
    })
}

const deleteUsers = (req = request, res = response) => {
    const {id} = req.params.id
    res.json({
        id,
        msg: "delete API"
    })
}

module.exports = {
    postUsers,
    getUsers,
    putUsers,
    deleteUsers
}