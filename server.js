// server.js

const express = require("express");
const axios = require("axios");
// const app = express();
// const PORT = 5000; // Define your desired port number
const cors = require("cors"); // Enable CORS if frontend and backend are on different origins
const app = express();
const PORT = process.env.PORT || 5000; // Define your desired port number

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
// YouTube API endpoint
const YOUTUBE_API_KEY = "AIzaSyAClHOV99oW3mPkcHC54gBF1JwK7mmA74c";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";

app.get("/video/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const response = await axios.get(
      `${YOUTUBE_API_URL}?part=player&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const videoUrl = response.data.items[0].player.embedHtml; // Extract video URL or other necessary details
    res.json({ videoUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
