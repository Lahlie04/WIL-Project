const router = require("express").Router();

const auth_controller = require("../controller/auth_controller");

router.post("/register", auth_controller.register);
router.post("/login", auth_controller.login);

module.exports = router;