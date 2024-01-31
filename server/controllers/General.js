import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await User.findBy(id);
    res.status(200).json(userId);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
