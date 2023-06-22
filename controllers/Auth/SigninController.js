import User from "../../models/UserModel.js";
import { VerifyToken, AccessToken, RefreshToken } from "../../modules/Token.js";

export const SignIn = async (req, res) => {
  try {
    const {
      user_id,
      email, // 이메일주소
      password,
      salt, // 삭제 해야함 - 보안
      access_token,
      refresh_token,
    } = req.body;
    // console.log(111, req.body);

    let access = "";
    let refresh = "";

    if (
      VerifyToken(access_token) === null ||
      VerifyToken(refresh_token) === null
    ) {
      // console.log(VerifyToken(access_token));
      // console.log(VerifyToken(refresh_token));
      console.log("---토큰이 만료되었거나 없습니다----");
      access = AccessToken(email);
      refresh = RefreshToken(email);
      console.log("-------토큰이 발급되었습니다-------");
    } else {
      // console.log(VerifyToken(access_token));
      // console.log(VerifyToken(refresh_token));
      access = access_token;
      refresh = refresh_token;
    }

    const user = new User({
      user_id,
      access_token: access,
      refresh_token: refresh,
    });

    await User.updateOne(
      { _id: user_id },
      { access_token: access, refresh_token: refresh }
    ).catch((e) => {
      console.log(e);
    });

    return res
      .cookie("accessToken", access, {
        httpOnly: true,
      })
      .cookie("refreshToken", refresh, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        info: {
          user_id: user_id,
          email: email,
          password: password, // 삭제 해야함 - 보안
          salt: salt, // 삭제 해야함 - 보안
          access_token: access, // 삭제 해야함 - 보안
          refresh_token: refresh, // 삭제 해야함 - 보안
        },
      });
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
