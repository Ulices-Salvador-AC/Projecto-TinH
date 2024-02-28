const Role = require("../models/role")
const User = require("../models/user")

// Validar que el rol esista en DB
const validateRoles = async(role = "") => {
    const roleExists = await Role.findOne({role})
    if (!roleExists) {
        throw new Error(`El role ${role} no existe en base de datos`)
}}

// Validar que el email no se repita en DB
const validateEmail = async(email = "") => {
    const emailExists = await User.findOne({email})
    if (emailExists) {
        throw new Error(`El email ${email} ya existe en base de datos`)
}}

// Validar que el ID sea de mongo.
const userExistsById = async(id) => {
    const mongoIdExists = await User.findById(id)
    if (!mongoIdExists) {
        throw new Error(`El usuario con el id ${id} no existe en base de datos`)
}}

module.exports = {
    validateRoles,
    validateEmail,
    userExistsById
}