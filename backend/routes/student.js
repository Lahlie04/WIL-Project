const router = require("express").Router();
const { uploader } = require("../middleware/uploader");

const student_controller = require("../controller/student_controller");

router.get("/getLectures",student_controller.getAllLacture);
router.get("/getStudents",student_controller.getStudent);
router.post("/admission",student_controller.application);

module.exports = router;