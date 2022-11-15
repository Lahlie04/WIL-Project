const router = require("express").Router();

const student_controller = require("../controller/student_controller");

router.get("/getLectures",student_controller.getAllLacture);

module.exports = router;