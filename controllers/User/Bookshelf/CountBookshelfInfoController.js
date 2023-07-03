import User from "../../../models/UserModel.js";

// 좋아요 목록 전달기능
export const CountBookshelfInfo = async (req, res) => {
  // console.log(req?.cookies?.accessToken);
  try {
    const output = {};
    // count category
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
        const keys = [];
        data.map((data) => {
          // console.log(data?._id, data?.count);
          tmp[data?._id] = data?.count;
          keys.push(data?._id);
        });
        output.category = tmp;
        output.maxCategory = keys[0];
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
    //count author
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
        const keys = [];
        data.map((data) => {
          // console.log(data?._id, data?.count);
          tmp[data?._id] = data?.count;
          keys.push(data?._id);
        });
        output.author = tmp;
        output.maxAuthor = keys[0];
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

      // page 계산
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
          _id: null,
          page_sum: { $sum: "$user_bookshelf.page" },
          weight_sum: { $sum: "$user_bookshelf.weight" },
          size: { $sum: 1 },
          // data: { $push: '$$ROOT' },
          // page_mean: { $avg: ['$page_sum', { $size: '$data' }] },
          // weight_mean: { $avg: ['$weight_sum', { $size: '$data' }] },

        },
      },
    ])
    .then((data) => {
      console.log(3333);
      console.log(333, data);
      // const maxCategory = data[0];
      output.page_sum = data[0]?.page_sum;
      output.weight_sum = data[0]?.weight_sum;
      output.page_mean = Math.floor(data[0]?.page_sum / data[0]?.size);
      output.weight_mean = Math.floor(data[0]?.weight_sum / data[0]?.size);

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
  
// 최하단
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
