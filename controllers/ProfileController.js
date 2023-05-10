import Profile from "../models/ProfileModel.js";

export const SignUp = async (req, res) => {
  const {
    name, // 이름
    birth, // 생년월일
    sex, // 성별
    phone, // 핸드폰번호 -> 부분암호화? 고려
    email, // 이메일주소
    usertype, // 사용자타입(사용자,관리자)
    signuptype, // 가입타입(카카오,구글,네이버,애플 등)
  } = req.body;

  const profile = new Profile({
    name,
    birth,
    sex,
    phone,
    email,
    usertype,
    signuptype,
  });

  profile
    .save()
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          info: {
            profile: {
              name: profile.name,
              birth: profile.birth,
              sex: profile.sex,
              phone: profile.phone,
              email: profile.email,
              usertype: profile.usertype,
              signuptype: profile.signuptype,
            },
          },
        });
      } else {
        res.status(404).json({
          success: false,
          error: {
            message: "server error",
          },
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({
        success: false,
        error: {
          message: err.message,
        },
      });
    });
};
