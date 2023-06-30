import User from "../../../models/UserModel.js";

// 좋아요 목록 전달기능
export const CartCheck = async (req, res) => {
  // console.log(444, req?.cookies?.accessToken);
  try {
    await User.findOne(
      {
        access_token: req?.cookies?.accessToken,
      },
      {
        _id: 0,
        user_cart: { isbn: 1 },
      }
    ).then((data) => {
      // console.log(333, data);
      const list = [];
      for (let i = 0; i < data?.user_cart.length; i++) {
        // console.log(data.user_cart[i].isbn);
        console.log(i);
        const isbn = data?.user_cart[i].isbn;
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
