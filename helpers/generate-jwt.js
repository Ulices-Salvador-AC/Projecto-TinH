const jwt = require("jsonwebtoken")

const generateJwt = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid}
        jwt.sign(payload, process.env.secretPrivateKey,{
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject("No se logro generar el token")
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJwt
}