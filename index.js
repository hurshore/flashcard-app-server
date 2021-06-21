const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const app = express();

app.use(cors());
app.use(express.static('.'));
app.use(express.json());
dotenv.config();

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to db');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server up and running');
    });
  }
);

// Routes
app.use('/api/user', authRoutes);
app.use('/api/flashcards', flashcardRoutes);
