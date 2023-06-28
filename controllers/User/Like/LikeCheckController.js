import User from "../../../models/UserModel.js";

// 좋아요 목록 전달기능
export const LikeCheck = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  try {
    await User.findOne(
      {
        access_token: req?.cookies?.accessToken,
      },
      {
        _id: 0,
        user_like_book: { isbn: 1 },
      }
    ).then((data) => {
      console.log(333, data.user_like_book);
      const list = [];
      for (let i = 0; i < data.user_like_book.length; i++) {
        // console.log(data.user_like_book[i].isbn);
        // console.log(i);
        const isbn = data.user_like_book[i].isbn;
        list.push(isbn);
      }
      // console.log(list);
      return res.status(200).json({
        success: true,
        info: {
          list: list,
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
