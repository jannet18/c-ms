// import Product from "../models/Product.js";
import Product from "../models/product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    // get products
    const products = await Product.find();
    // get product stats
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        // get specific product start
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          // append to the product id
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
    // console.log(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // serverside pagination
    // sort should look like this: {"field": "userdId", "sort" : "desc" }
    const [page = 1, pageSize = 20, sort = null, search = ""] = req.query;
    // formatted sort should look like {userId: -1}
    const generalSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed?.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    // check if sort exists or not
    const sortFormatted = Boolean(sort) ? generalSort() : {};
    // set up transcation search, limited query
    const transactions = await Transaction.find({
      $or: [{ cost: { $regex: new RegExp(search, "i") } }],
      $or: [{ userId: { $regex: new RegExp(search, "i") } }],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    // all transcations query
    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    console.log(total);
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
