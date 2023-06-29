import User from "../../../models/UserModel.js";

export const ProfileChange = async (req, res) => {
  console.log(req?.cookies?.accessToken);
  try {
    await User.findOne(
      {
        access_token: req?.cookies?.accessToken,
      },
      {}
    ).then((data) => {
      console.log(333, data);
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
      },
    });
  }
};
