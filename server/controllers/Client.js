// import Product from "../models/Product.js";
import Product from "../models/product.js";
import ProductStat from "../models/ProductStat.js";
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
