import User from "../models/User.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.username = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar; // base64 saved

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const showProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Show profile error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
