import { VerifyToken, AccessToken } from "../../modules/Token.js";
<<<<<<< HEAD
import Auth from "../../models/AuthModel.js";
import User from "../../models/UserModel.js";
=======
import Authentication from "../../models/auth.js";
import User from "../../models/user.js";
>>>>>>> 5fbb845dcd4ee040f11dd90a2bec083bdb5b86ac
import Express from "express";
import cookieParser from "cookie-parser";
// const router = Express.Router();

export const AuthToken = async (req, res) => {
  /**
   * access token 또는 refresh token 자체가 없는 경우엔 에러(401)를 반환
   * 클라이언트측에선 401을 응답받으면 로그인 페이지로 이동시킴
   */
  // cookieParser();
  const currentAccessToken = req.cookies?.accessToken;
  const currentRefreshToken = req.cookies?.refreshToken;

  try {
    if (currentAccessToken === undefined || currentRefreshToken === undefined) {
      throw Error("API 사용 권한이 없습니다.");
    }
  } catch (e) {
    return res.status(401).json({
      success: true,
      isAuth: false,
      message: e.message,
    });
  }
  const decodedAccessToken = VerifyToken(currentAccessToken);
  const decodedRefreshToken = VerifyToken(currentRefreshToken); // *실제로는 DB 조회

  // console.log("accessToken", decodedAccessToken);
  // console.log("refreshToken", decodedRefreshToken);
  const res_data = await User.findOne({
    refresh_token: currentRefreshToken,
  })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
    });

  // console.log(res_data);

  // 리소스(해당 토큰을 가지고 있는 유저)를 찾을 수 없음
  if (!res_data?._id) {
    return res
      .status(404)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        success: true,
        isAuth: false,
      });
  }

<<<<<<< HEAD
=======
  const { email, name, usertype } = await Authentication.findById(user_id.user_id);

>>>>>>> 5fbb845dcd4ee040f11dd90a2bec083bdb5b86ac
  const userData = {
    email: res_data?.user_email,
    name: res_data?.user_name,
    name: res_data?.user_name,
    nickname: res_data?.profile.user_nickname,
    image: res_data?.profile.image,
    user_type: String(res_data?.user_type),
  };

  if (decodedAccessToken === null) {
    if (decodedRefreshToken === null) {
      // case1: access token과 refresh token 모두가 만료된 경우
      try {
        throw Error("API 사용 권한이 없습니다.");
      } catch (e) {
        return res.status(401).json({
          success: true,
          isAuth: false,
          message: e.message,
        });
      }
    } else {
      // case2: access token은 만료됐지만, refresh token은 유효한 경우
      /**
       *  DB를 조회해서 payload에 담을 값들을 가져오는 로직
       */
      const newAccessToken = AccessToken(userData);
      // console.log(222, newAccessToken);
      await User.updateOne(
        { _id: res_data?._id },
        { access_token: newAccessToken }
      ).catch((e) => {
        console.log(e);
      });

      return res
        .cookie("accessToken", newAccessToken, {
          httpOnly: true,
        })
        .status(201)
        .json({
          success: true,
          isAuth: true,
          info: {
            message: "token이 만료되어 access token 생성",
            userData: userData,
          },
        });
    }
  } else {
    // console.log("decodedRefreshToken:", decodedRefreshToken);
    if (decodedRefreshToken === null) {
      // console.log("expired");
      // case3: access token은 유효하지만, refresh token은 만료된 경우
      return res.status(401).json({
        success: true,
        isAuth: false,
        message: "refresh token이 만료 되어 다시 로그인 해주세요. ",
      });
    } else {
      // case4: accesss token과 refresh token 모두가 유효한 경우
      return res.status(200).json({
        success: true,
        message: "모든 토큰 유효",
        isAuth: true,
        userData: userData,
      });
    }
  }
};
