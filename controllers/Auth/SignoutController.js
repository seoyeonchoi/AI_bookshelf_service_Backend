//logout하는 기능
export const SignOut = async (req, res, next) => {
  // console.log("로그아웃");
  try {
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({
        success: true,
        info: {
          message: "성공적으로 로그아웃하였습니다.",
        },
      });
  } catch (error) {
    next(error);
  }
};
