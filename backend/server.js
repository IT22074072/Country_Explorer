const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;


app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

