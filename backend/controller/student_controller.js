const {getAllLactureDb, applicationDb, getStudentDb} = require("../db/user.db");
const uploadFile = require('../helpers/fileUpload');

const getAllLacture = async (req, res, next) =>{
    try {
        const lectures = await getAllLactureDb();

        return res.status(200).send(lectures);
    } catch (error) {
        return next(error);
    }
}

const file = async (req, res, next) => {
    try {
        console.log(req.file);
        const admission_letter =await uploadFile.fileUpload(req.file.path,"Applications",'raw');
        return res.status(200).send(admission_letter);
    } catch (error) {
        next(error);
    }
}

const application = async (req, res, next) => {
    try {

        console.log(req.body);
        // console.log(req.file);

        if(!req.body.id){ return next(new Error("Something went wrong"));}


        if(!req.body.lectureID){ return next(new Error("Lecture not found"));}

        const status = "Received";

        const application = await applicationDb(studentID.userid, req.body.lectureID, status);

        return res.status(200).send(application);
    } catch (error) {
        next(error);
    }
}

const getStudent = async (req, res, next) =>{
    try {
        students = await getStudentDb();
        return res.status(200).send(students);
    } catch (error) {
        throw error;
    }
}

module.exports ={
    getAllLacture,
    application,
    getStudent
}