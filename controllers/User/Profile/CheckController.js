import User from "../../../models/UserModel.js";

const aggregatePipeline = [
  {
    $facet: {
      book_data: [
        { $project: { user_bookshelf: 1 } },
        { $unwind: '$user_bookshelf' },
        {
          $group: {
            _id: null,
            page_sum: { $sum: '$user_bookshelf.page' },
            weight_sum: { $sum: '$user_bookshelf.weight' },
            data: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            page_sum: 1,
            weight_sum: 1,
            page_mean: { $divide: ['$page_sum', { $size: '$data' }] },
            weight_mean: { $divide: ['$weight_sum', { $size: '$data' }] },
            data: 1,
          },
        },
        { $unwind: '$data' },
        {
          $group: {
            _id: '$data.user_bookshelf.category',
            count: { $sum: 1 },
            data: { $push: '$data' },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 1 },
        {
          $project: {
            maxCategory: '$_id',
            count: 1,
            data: 1,
          },
        },
      ],
      maxAuthor: [
        { $project: { user_bookshelf: 1 } },
        { $unwind: '$user_bookshelf' },
        {
          $group: {
            _id: '$user_bookshelf.author',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 1 },
        {
          $project: {
            maxAuthor: '$_id',
            count: 1,
          },
        },
      ],
      category: [
        { $unwind: '$user_bookshelf' },
        {
          $group: {
            _id: '$user_bookshelf.category',
            categoryCount: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            category: { $push: { category: '$_id', count: '$categoryCount' } },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ],
    },
  },
  {
    $unwind: '$book_data',
  },
  {
    $unwind: {
      path: '$maxAuthor',
      preserveNullAndEmptyArrays: true,
    },
  },

  
  {
    $project: {
      page_sum: '$book_data.data.page_sum',
      page_mean: '$book_data.data.page_mean',
      weight_sum: '$book_data.data.weight_sum',
      weight_mean: '$book_data.data.weight_mean',
      maxCategory: '$book_data.maxCategory',
      maxAuthor: { $ifNull: ['$maxAuthor.maxAuthor', null] },
          category: {
            $cond: {
              if: { $isArray: '$category.category' },
              then: { $arrayElemAt: ['$category.category', 0] },
              else: [],
            },
          },
        },
      },
    ];



// 집계 목록 전달기능
export const Check = async (req, res) => {
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
      // console.log(333, data?.user_like_book);
      // console.log(list);
      return res.status(200).json({
        success: true,
        info: aggregatePipeline
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
