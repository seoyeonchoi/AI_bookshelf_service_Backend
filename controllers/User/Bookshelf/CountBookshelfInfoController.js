import User from "../../../models/UserModel.js";

// 좋아요 목록 전달기능
export const CountBookshelfInfo = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  try {
    const output = {};
    await User.aggregate([
      {
        $match: {
          access_token: req?.cookies?.accessToken,
        },
      },
      { $project: { user_bookshelf: 1, _id: 0 } },
      { $unwind: "$user_bookshelf" },
      {
        $group: {
          _id: "$user_bookshelf.category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ])
      .then((data) => {
        const tmp = {};
        data.map((data) => {
          // console.log(data?._id, data?.count);
          tmp[data?._id] = data?.count;
        });
        output.category = tmp;
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          success: false,
          info: {
            message: error,
          },
        });
      });
    await User.aggregate([
      {
        $match: {
          access_token: req?.cookies?.accessToken,
        },
      },
      { $project: { user_bookshelf: 1, _id: 0 } },
      { $unwind: "$user_bookshelf" },
      {
        $group: {
          _id: "$user_bookshelf.author",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ])
      .then((data) => {
        console.log(111, data);
        const tmp = {};
        data.map((data) => {
          // console.log(data?._id, data?.count);
          tmp[data?._id] = data?.count;
        });
        output.author = tmp;
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          success: false,
          info: {
            message: error,
          },
        });
      });

    return res.status(200).json({
      success: true,
      output,
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
