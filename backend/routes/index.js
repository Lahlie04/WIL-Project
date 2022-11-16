const router = require("express").Router();
const { uploader } = require("../middleware/uploader");

const auth = require("./auth");
const student = require("./student");

router.use("/auth",auth);
router.use("/student",student);

module.exports = router;