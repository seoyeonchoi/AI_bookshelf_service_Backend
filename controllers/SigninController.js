import Profile from "../models/User/ProfileModel.js";
import Authentication from "../models/User/AuthenticationModel.js";
import Password from "../models/Auth/PasswordModel.js";
import User from "../models/User/UserModel.js";

export const SignIn = async (req, res) => {
  try {
    const {
      email, // 이메일주소
      password,
      salt,
    } = req.body;

    // const user = new User({
    //   email,
    // });

    // const hashpassword = new Password({
    //   password,
    //   salt,
    // });
    console.log(password);
    const user_id = await User.findOne({
      email: email,
      pwd: password,
    }).then((data) => data._id);
    console.log(111, data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      info: {
        message: e,
      },
    });
  }
};
