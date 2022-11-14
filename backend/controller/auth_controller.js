const USerService = require('../service/user.service');
const { roles } = require('../helpers/constant');

const register = async (req, res, next) => {
    if (!req.body)
        return next(new Error("All fields required"));

    const { name, password, email, lastname, role, student_no, lectureID, studentID, stuff_no } = req.body;
    let data = {};
    data = {
        name: name ? String(name).trim() : null,
        password: password ? String(password).trim() : null,
        email: email ? String(email).trim() : null,
        lastname: lastname ? String(lastname).trim() : null,
        student_no: student_no ? String(student_no) : null,
        stuff_no: stuff_no ? String(stuff_no) : null,
        studentID: studentID ? Number(tenantID) : null,
        lectureID: lectureID ? Number(tenantID) : null,
        role: role
    }

    try {

        if (!data.role || !data.name || !data.password || !data.email || !data.lastname)
            return res.status(400).json({ message: `Missing/empty field found`, ...data });

        const user = await USerService.createUser(data);

        if(!user) return res.status(500).send("Something went wrong");


        return res.status(200).send(user);
    }catch(error){
        next(error);
    }

}

module.exports = {
    register
}
