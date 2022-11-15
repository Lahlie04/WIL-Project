const {createUserDb, createStudentDb, createLectureDb, getUserByEmailDb} = require('../db/user.db');
const {hashPassword, comparePassword} = require('../helpers/password');
const {roles} = require('../helpers/constant');
const {generateToken} = require('../middleware/jwt');

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

    login = async ({email, password}) =>{
        //find user if exists
        const user = await getUserByEmailDb(email);

        //if user not fount 
        if(!user) {throw Error("User not found check email and password");}

        //call function to compare hash with plain user input(password);
        const result = await comparePassword(password, user.password);

        if(result){
            //create token
            const token = await generateToken({userId: user.id, userRole: user.role});
            return {user: user,token};
        }
        else{
            throw new Error("Password do not match");
        }
    };

}

module.exports = new USerService();