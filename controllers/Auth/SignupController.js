import Auth from "../../models/AuthModel.js";
import User from "../../models/UserModel.js";

export const SignUp = async (req, res) => {
  try {
    const {
      name, // 이름
      birth, // 생년월일
      sex, // 성별
      email, // 이메일주소
      nickname, // 닉네임(별명)
      phone, // 전화번호
      work, // 직업
      signuppath, // 가입경로
      useCheck, // 이용약관 동의
      infoCheck, // 사용자 정보 동의
      marketingCheck, // 마케팅 동의
      password,
      salt,
    } = req.body;
    // console.log(req.body);

    const user = new User({
      user_email: email,
      user_name: name,
      user_birth: birth,
      user_sex: sex,
      profile: {
        user_nickname: nickname, // 닉네임(별명)
      },
      user_phone: phone, // 전화번호
      user_work: work, // 직업
      signuppath, // 가입경로
      useCheck, // 이용약관 동의
      infoCheck, // 사용자 정보 동의
      marketingCheck, // 마케팅 동의
    });

    const auth = new Auth({
      salt,
      password,
    });

    user // 사용자 정보 저장
      .save()
      .then((user) => {
        // console.log(user._id);
        if (user) {
          auth.user_id = user._id;
          auth
            .save() // 계정 로그인 정보 저장
            .then(() => {
              if (auth) {
                return res.status(200).json({
                  success: true,
                  info: {
                    user: {
                      user_id: user._id,
                      name: user.name,
                      birth: user.birth,
                      sex: user.sex,
                      email: user.email,
                      auth: {
                        password: auth.password,
                        salt: auth.salt,
                      },
                      nickname: user.nickname,
                      img_url: user.img_url,
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
