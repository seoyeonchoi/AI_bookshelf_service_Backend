import User from "../../../models/UserModel.js";

// 좋아요 목록 전달기능
export const LikeList = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  try {
    await User.findOne(
      {
        access_token: req?.cookies?.accessToken,
      },
      {
        // id: _id,
        user_like_book: 1,
      }
    ).then((data) => {
      // console.log(333, data?.user_like_book);
      // console.log(list);
      return res.status(200).json({
        success: true,
        info: {
          list: data?.user_like_book.reverse(),
        },
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
