const {Router} = require("express")
const { getUsers, postUsers, putUsers, deleteUsers } = require("../controllers/users.controllers")
const router = Router()

router.post("/", postUsers)
router.get("/", getUsers)
router.put("/:id", putUsers)
router.delete("/:id", deleteUsers)

module.exports = router