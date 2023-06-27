import User from "../../../models/UserModel.js";

// 좋아요 삭제기능
export const Deletelike = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  await User.findOne(
    {
      access_token: req?.cookies?.accessToken,
    },
    {
      _id: 1,
    }
  ).then(async (data) => {
    console.log(req?.body.isbn);
    await User.updateOne(
      { _id: data._id },
      { $pull: { user_like_book: req?.body } }
    ).then((data) => console.log(data));
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
