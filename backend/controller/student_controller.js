const {getAllLactureDb} = require("../db/user.db");

const getAllLacture = async (req, res, next) =>{
    try {
        const lectures = await getAllLactureDb();

        return res.status(200).send(lectures);
    } catch (error) {
        return next(error);
    }
}

module.exports ={
    getAllLacture
}