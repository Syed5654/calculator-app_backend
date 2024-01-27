const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../config/db");
const { handleValidationErrors } = require("../middleware/validator");

const handleLogin = async (req, res) => {
  const validationErrors = handleValidationErrors(req, res);
  if (validationErrors) {
    return true;
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(200).json({
        error: true,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password.toString(),
      user.password
    );

    if (!isPasswordValid) {
      return res.status(200).json({
        error: true,
        message: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );


    res.json({
      error: false,
      user: {
        id: user.id,
        name: user.name,
        accessToken,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const handleRegister = async (req, res) => {
  const validationErrors = handleValidationErrors(req, res);
  if (validationErrors) {

    return true;
  }

  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(200).json({
        error: true,
        type: 'Duplicate',
        message: "User already exists! Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await User.findOne({ where: { email: req.body.email } });

    const accessToken = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(201).json({
      error: false,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        accessToken
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  handleLogin,
  handleRegister,
};
