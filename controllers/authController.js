const { signupValidation, loginValidation } = require('../utility/validation');
const User = require('../models/User');
const FlashcardSet = require('../models/FlashcardSet');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const signup = async (req, res) => {
  // Validate request body
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //Check if user exists with request email
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: 'Email already exists' });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    // Save new user to database
    await newUser.save();
    // Create a JWT
    const token = jwt.sign(
      { _id: newUser._id, name: req.body.name, email: req.body.email },
      process.env.TOKEN_SECRET
    );
    res.header('auth-token', token).json(token);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  // Validate request body
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'User does not exist' });

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).json({ error: 'Incorrect password' });

  // Create a JWT
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: req.body.email },
    process.env.TOKEN_SECRET
  );
  res.header('auth-token', token).json(token);
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const flashcardSets = await FlashcardSet.find({ user: req.user._id });

    return res
      .status(200)
      .json({ name: user.name, email: user.email, flashcardSets });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error fetching user' });
  }
};

module.exports = {
  signup,
  login,
  getUser,
};
