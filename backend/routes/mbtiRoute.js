const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const MbtiModel = require('../models/mbtiModel'); // Update the path

router.use(bodyParser.json());
// Route to save MBTI data
router.post('/saveMbti', async (req, res) => {
  const {
    gmail,
    Ne,
    Ni,
    Te,
    Ti,
    Se,
    Si,
    Fe,
    Fi,
    Type,
    Enneagram
  } = req.body;

  try {
    // Check if the user already exists
    let mbtiData = await MbtiModel.findOne({ gmail });

    if (mbtiData) {
      // If user exists, update the existing data
      mbtiData = await MbtiModel.findOneAndUpdate({ gmail }, {
        Ne,
        Ni,
        Te,
        Ti,
        Se,
        Si,
        Fe,
        Fi,
        Type,
        Enneagram
      }, { new: true });

      return res.status(200).json({ message: 'MBTI data updated successfully', data: mbtiData });
    }

    // If user does not exist, create a new record
    mbtiData = new MbtiModel({
      gmail,
      Ne,
      Ni,
      Te,
      Ti,
      Se,
      Si,
      Fe,
      Fi,
      Type,
      Enneagram
    });

    await mbtiData.save();
    res.status(201).json({ message: 'MBTI data saved successfully', data: mbtiData });
  } catch (error) {
    console.error('Error saving MBTI data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
