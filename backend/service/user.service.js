const {createUserDb, createStudentDb, createLectureDb, getUserByEmailDb} = require('../db/user.db');
const {hashPassword, comparePassword} = require('../helpers/password');
const {roles} = require('../helpers/constant');

class USerService{
    createUser = async (my_user) => {

        try {
                    //check if user exists
                const existing_user = await getUserByEmailDb(my_user.email);

                //if exist 
                if(existing_user) {throw Error("Email taken");}

                //encrypt/ hash password
                const hashedPassword = await hashPassword(my_user.password);

                const user = {
                    ...my_user,
                    password: hashedPassword
                };

                //create user 
                const newuser = await createUserDb(user);
                console.log('user service',newuser);
                
                //check user role and create STUDENT OR LECTURE
                if(newuser.role && newuser.role.toUpperCase() == roles.STUDENT){
                    const student = await createStudentDb({userID: newuser.id, student_no: user.student_no});
                    return student;
                }
                else
                if(newuser.role && newuser.role.toUpperCase() == roles.LECTURE){
                    const lecture = await createLectureDb({userID: newuser.id, stuff_no: newuser.stuff_no});
                    return lecture;
                }
                else{
                    throw Error("Role is Empty or Not Defined");
                }
        } catch (error) {
            throw error;
        }

    }
}

module.exports = new USerService();