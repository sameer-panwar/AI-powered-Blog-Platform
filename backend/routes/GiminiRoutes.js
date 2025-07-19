const express = require('express');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/generate-tags', async (req, res) => {
  const { blogContent } = req.body;

  try {
    const prompt = `Generate 5 tags for the following blog content:\n\n${blogContent}`;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const tags = response.data.candidates[0].content.parts[0].text;
    res.json({ tags });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate tags." });
  }
});

module.exports = router;
