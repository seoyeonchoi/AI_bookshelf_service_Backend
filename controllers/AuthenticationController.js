// import Authentication from "../models/Member/AuthenticationModel.js";

// export const SignUp = async (req, res) => {
//   const {
//     name, // 이름
//     birth, // 생년월일
//     sex, // 성별
//     phone, // 핸드폰번호 -> 부분암호화? 고려
//     email, // 이메일주소
//   } = req.body;

//   const authentication = new Authentication({
//     name,
//     birth,
//     sex,
//     phone,
//     email,
//   });

//   authentication
//     .save()
//     .then((user) => {
//       if (user) {
//         return res.status(200).json({
//           success: true,
//           info: {
//             authentication: {
//               name: authentication.name,
//               birth: authentication.birth,
//               sex: authentication.sex,
//               phone: authentication.phone,
//               email: authentication.email,
//             },
//           },
//         });
//       } else {
//         res.status(404).json({
//           success: false,
//           error: {
//             message: "server error",
//           },
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res.status(400).json({
//         success: false,
//         error: {
//           message: err.message,
//         },
//       });
//     });
// };
