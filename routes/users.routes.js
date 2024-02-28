const {Router} = require("express")
const {check} = require("express-validator")
const { getUsers, postUsers, putUsers, deleteUsers } = require("../controllers/users.controllers")
const { validateFiels } = require("../middlewares/validate-files")
const { validateRoles, validateEmail, userExistsById } = require("../helpers/db-validators")
const { validateJWT } = require("../middlewares/validate-jwt")
const { administratorRole, hasAValidRole } = require("../middlewares/validate-roles")
const router = Router()

router.post("/", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(validateEmail),
    check("password", "La contraseña debe contener mas de 5 caracteres").isLength(6),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    // check("role", "No es un role valido").isIn(['TEACHER_ROLE', 'STUDENT_ROLE']),
    check("role").custom(validateRoles),
    validateFiels
], postUsers)

router.get("/", getUsers)
router.put("/:id",[
    check("id", "No es un id valido").isMongoId(),
    check('id').custom(userExistsById),
    check("role").custom(validateRoles),
    validateFiels
], putUsers)
router.delete("/:id", [
    validateJWT,
    // Solo para permitir el role de teacher
    // administratorRole,
    // Permitir algunos de los roles "TEACHER_ROLE", "STUDENT_ROLE"
    hasAValidRole("TEACHER_ROLE", "STUDENT_ROLE"),
    check("id", "No es un id valido").isMongoId(),
    check('id').custom(userExistsById),
    validateFiels
],deleteUsers)

module.exports = router