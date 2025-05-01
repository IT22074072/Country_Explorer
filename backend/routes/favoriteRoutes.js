const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const auth = require('../middleware/authMiddleware');

router.use(auth); 

// Add to favorites
router.post('/add', async (req, res) => {
    const { countryCode } = req.body;
    console.log("check body id", req.body);
    console.log("check user id and country id", req.userId, countryCode);
    try {
        const existingFavorite = await Favorite.findOne({ userId: req.userId, countryId: countryCode });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Already in favorites' });
        }
        console.log("check existingFavorite", existingFavorite);
        const favorite = await Favorite.create({
            userId: req.userId,
            countryId: countryCode,
        });
        console.log("check favorite", favorite);
        res.json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Remove from favorites
router.delete('/remove', async (req, res) => {
    const { countryCode } = req.body;
    console.log("check body id", req.body);
    try {
        const result = await Favorite.findOneAndDelete({ 
            userId: req.userId, 
            countryId: countryCode 
        });
        
        if (!result) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all favorites for a user
router.get('/all', async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.userId });
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
});



module.exports = router;