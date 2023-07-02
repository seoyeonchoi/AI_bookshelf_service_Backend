// 회원가입 전 사용자 계정 중복확인하는 기능
import User from "../../models/UserModel.js";

export const CheckUserEmail = async (req, res, next) => {
  try {
    await User.findOne(
      { user_email: req?.body?.email },
      { user_email: 1, _id: 0 }
    ).then((data) => {
      console.log(!data);
      return res.status(200).json({
        success: true,
        info: {
          check: !data,
        },
      });
    });
    // console.log(req?.body);
  } catch (error) {
    return res.status(500).json({
      success: true,
      info: {
        message: error,
      },
    });
  }
};
