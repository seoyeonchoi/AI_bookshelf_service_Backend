import User from "../../../models/UserModel.js";

// 좋아요 추가기능
export const AddCart = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  await User.findOne(
    {
      access_token: req?.cookies?.accessToken,
    },
    {
      _id: 1,
    }
  ).then(async (data) => {
    console.log(data);
    await User.updateOne(
      { _id: data._id },
      { $addToSet: { user_cart: req?.body } }
    );
  });
  try {
    // console.log(req.body);
    // console.log(req.cookies);
    return res.status(200).json({
      success: true,
      info: {
        message: "성공",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      info: {
        message: error,
      },
    });
  }
};
