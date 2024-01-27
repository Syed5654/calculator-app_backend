const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const register_validator = [
  check("name", "Name should not be empty").notEmpty(),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

const login_validator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email"),
  check("password", "Password is required").notEmpty(),
];

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((error) => {
      if (!formattedErrors[error.path]) {
        formattedErrors[error.path] = [];
      }
      formattedErrors[error.path].push(error.msg);
    });

    return res.status(200).json({
      error: true,
      validation_message: formattedErrors,
    });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }
  const splitToken = token.split(" ")[1];

  jwt.verify(splitToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(req.user);
    if (err) {
      return res.status(403).json({ error: true, message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  register_validator,
  login_validator,
  handleValidationErrors,
  authenticateToken,
};
