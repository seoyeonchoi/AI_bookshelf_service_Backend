import User from "../../../models/UserModel.js";

// 좋아요 목록 전달기능
export const BookshelfList = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  try {
    await User.findOne(
      {
        access_token: req?.cookies?.accessToken,
      },
      {
        // id: _id,
        user_bookshelf: 1,
      }
    ).then((data) => {
      // console.log(333, data?.user_bookshelf);
      // console.log(list);
      return res.status(200).json({
        success: true,
        info: {
          list: data?.user_bookshelf,
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
