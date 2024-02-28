const { Router } = require("express");
const { login } = require("../controllers/auth.controllers");
const { check } = require("express-validator");
const { validateFiels } = require("../middlewares/validate-files");
const { validateEmail } = require("../helpers/db-validators");

const router = Router()

router.post("/login", [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFiels
],login)


module.exports = router