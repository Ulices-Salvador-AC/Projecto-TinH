const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
    role: {
        require: [true, "El role es obligatorio"],
        type: String
    }
})

module.exports = model("Role", RoleSchema)