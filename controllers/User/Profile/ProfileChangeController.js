import User from "../../../models/UserModel.js";

export const ProfileChange = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  // console.log(req?.body);
  const { user_nickname, image } = req?.body;
  try {
    await User.updateOne(
      {
        access_token: req?.cookies?.accessToken,
      },
      {
        profile: {
          user_nickname,
          image,
        },
      }
    ).then((data) => {
      // console.log(333, data);
      // console.log(list);
      return res.status(200).json({
        success: true,
        info: { data },
      });
    });
    // console.log(req.body);
    // console.log(req.cookies);
  } catch (error) {
    res.status(500).json({
      success: false,
      info: {
        message: error,
        e2a2d634abffd9d6ca0b744d007e4c379bca9611,
      },
    });
  }
};
