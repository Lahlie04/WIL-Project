const {pool} = require("../config/config");


const createUserDb = async ({name,password, email, lastname, role}) =>{
    try {
        const user = await pool.query(
            `INSERT INTO users(name, password, email,lastname,role)
             VALUES($1, $2, $3, $4, $5)
             RETURNING ID, name, lastname, email, role, created_at`,
             [name, password, email, lastname, role]
        );
        const myuser = user.rows[0];
        console.log('user db',myuser);
        return myuser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const createStudentDb = async ({userID,student_no}) =>{

    try {
        const tenant = await pool.query(
            `INSERT INTO student(userID, student_no)
             VALUES($1, $2)
             RETURNING userID, student_no`,
             [userID, student_no]
        );
        const mytenant = tenant.rows[0];
        console.log(mytenant);
        return mytenant;
    } catch (error) {
        throw error;
    }
};

const createLectureDb = async ({userID,stuff_no,module}) =>{

    try {
        const tenant = await pool.query(
            `INSERT INTO lecture(userID, stuff_no, module)
             VALUES($1, $2, $3)
             RETURNING userID, stuff_no, module`,
             [userID, stuff_no, module]
        );
        const mytenant = tenant.rows[0];
        console.log(mytenant);
        return mytenant;
    } catch (error) {
        throw error;
    }
};

const getUserByEmailDb = async (email) => {
    const {rows: exists} = await pool.query(
        "select * from users where lower(email) = lower($1)",
        [email]
    );
    return exists? exists[0]: false;
};

const getAllLactureDb = async () =>{
    try {
        const lectures = await pool.query(
            `SELECT * FROM users, lecture
             WHERE users.id = lecture.userid`
        );
        console.log(lectures.rows);
        return lectures.rows 
    } catch (error) {
        throw error
    }
    
}

// studentID integer,
//     lectureID integer,
//     admision_letter varchar(200),
//     wil_letter varchar(200),
//     employee_letter varchar(200),
//     status varchar(50),

const getStudentDb = async () =>{
    const studentID = await pool.query(
        `SELECT * FROM users, student
         WHERE  users.id = student.userid
         `
    );

    return studentID.rows;
}

const applicationDb = async (studentID, lectureID, status) =>{
    try {
        const application = await pool.query(
            `INSERT INTO application(studentID, lectureID, status)
             VALUES($1, $2, $3)
             RETURNING *`,[studentID, lectureID, status]
        );

        console.log(application.rows[0]);
        return application.rows[0];
    } catch (error) {
        throw(error);
    }
}



module.exports = {
    createUserDb,
    createStudentDb,
    createLectureDb,
    getUserByEmailDb,
    getAllLactureDb,
    getStudentDb,
    applicationDb
}