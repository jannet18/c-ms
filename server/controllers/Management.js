import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    // grab user id n convert to the correct format
    const userWithStats = await User.aggregate([
      // matching with user id
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          // grab details from the affiliate stats
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" }, //flatten array
    ]);
    console.log(userWithStats);
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales?.map((id) => {
        return Transaction.findById(id);
      })
    );
    // console.log(Transaction.findById(id));
    // filter
    const filteredSaleTransactions = saleTransactions?.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    console.log(userWithStats, filteredSaleTransactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
