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

const createLectureDb = async ({userID,stuff_no}) =>{

    try {
        const tenant = await pool.query(
            `INSERT INTO lecture(userID, stuff_no)
             VALUES($1, $2)
             RETURNING userID, student_no`,
             [userID, stuff_no]
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
} 



module.exports = {
    createUserDb,
    createStudentDb,
    createLectureDb,
    getUserByEmailDb
}