import { RequestHandler } from "express";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyCJj1-E24vK_lMKZimd1Z3zNYM2PKV0WM0";
const SERP_API_KEY = "5d1dd5a5371ec61df23a66d6f5fb682a62b415777dea5f0adf6d9d2b8291756b"; // 🔁 Replace this with your real key

// ✅ Define expected response structure from YouTube
interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string };
    snippet: { title: string };
  }>;
}

// ✅ Define expected response structure from SerpAPI
interface SerpApiResponse {
  organic_results: Array<{
    title: string;
    link: string;
    source?: string;
  }>;
}

export const handleGenerateCourse: RequestHandler = async (req, res) => {
  const { prompt } = req.body;

  try {
    const searchQuery = `tutorial ${prompt}`;

    // 🔍 YouTube Search
    const ytResponse = await axios.get<YouTubeSearchResponse>(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: YOUTUBE_API_KEY,
          q: searchQuery,
          part: "snippet",
          maxResults: 5,
          type: "video",
        },
      }
    );

    const videos = ytResponse.data.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    // 📄 SerpAPI Search
    const serpResponse = await axios.get<SerpApiResponse>(
      "https://serpapi.com/search",
      {
        params: {
          engine: "google",
          q: `${prompt} tutorial site:geeksforgeeks.org OR site:medium.com OR filetype:pdf`,
          api_key: SERP_API_KEY,
        },
      }
    );

    const documents = serpResponse.data.organic_results
      .slice(0, 5)
      .map((item) => ({
        title: item.title,
        url: item.link,
        source: item.source || "Web",
      }));

    res.status(200).json({
      title: `Course on ${prompt}`,
      videos,
      documents,
    });
  } catch (err) {
    console.error("Course generation error:", err);
    res.status(500).json({ error: "Failed to generate course" });
  }
};
