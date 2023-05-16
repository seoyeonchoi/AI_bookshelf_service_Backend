import Profile from "../../models/User/ProfileModel.js";
import Authentication from "../../models/User/AuthenticationModel.js";
import Password from "../../models/Auth/PasswordModel.js";
import User from "../../models/User/UserModel.js";

export const SignUp = async (req, res) => {
  try {
    const {
      name, // 이름
      birth, // 생년월일
      sex, // 성별
      email, // 이메일주소
      password,
      salt,
    } = req.body;

    const user = new User({
      name,
      email,
    });

    const authentication = new Authentication({
      birth,
      sex,
    });

    const hashpassword = new Password({
      password,
      salt,
    });

    const profile = new Profile({});

    user // 사용자 정보 저장
      .save()
      .then((user) => {
        // console.log(user._id);
        if (user) {
          authentication.user_id = user._id;
          profile.user_id = user._id;
          hashpassword.user_id = user._id;
          profile.save(); // 프로필 정보 저장
          hashpassword.save(); // 계정 로그인 정보 저장
          authentication // 사용자 인증 정보 저장
            .save()
            .then(() => {
              if (authentication) {
                return res.status(200).json({
                  success: true,
                  info: {
                    user: {
                      user_id: user._id,
                      name: user.name,
                      birth: authentication.birth,
                      sex: authentication.sex,
                      email: user.email,
                      auth: {
                        password: hashpassword.password,
                        salt: hashpassword.salt,
                      },
                      profile: {
                        nickname: profile.nickname,
                        img_url: profile.img_url,
                      },
                      type: {
                        usertype: user.usertype,
                        signuptype: user.signuptype,
                      },
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
