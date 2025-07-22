import { RequestHandler } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.YOUTUBE_API_KEY || !process.env.SERP_API_KEY) {
  throw new Error("Missing required API keys in .env file. Please add YOUTUBE_API_KEY and SERP_API_KEY.");
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SERP_API_KEY = process.env.SERP_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
const SERP_API_URL = "https://serpapi.com/search";

const MAX_RESULTS_PER_SOURCE = 5;

export interface YouTubeSearchResponse {
  items: {
    id: { videoId: string };
    snippet: { title: string };
  }[];
}

export interface SerpApiResponse {
  organic_results: {
    title: string;
    link: string;
    source?: string;
  }[];
}

function getCleanHostname(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch (e) {
    return url;
  }
}

function parseYouTubeItems(items: YouTubeSearchResponse["items"]) {
  return items
    .filter((item) => item.id?.videoId)
    .map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
}

function parseSerpResults(results: SerpApiResponse["organic_results"]) {
  return results.slice(0, MAX_RESULTS_PER_SOURCE).map((item) => ({
    title: item.title,
    url: item.link,
    source: item.source || getCleanHostname(item.link),
  }));
}

export const handleGenerateCourse: RequestHandler = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
    return res.status(400).json({ error: "Invalid prompt. Must be a string with at least 3 characters." });
  }

  console.log(`[COURSEGEN] Received request for prompt: "${prompt}"`);

  try {
    const youtubeSearchQuery = `tutorial ${prompt}`;
    const serpSearchQuery = `${prompt} tutorial site:geeksforgeeks.org OR site:medium.com OR filetype:pdf`;

    const [ytRes, serpRes] = await Promise.all([
      axios.get<YouTubeSearchResponse>(YOUTUBE_API_URL, {
        params: {
          key: YOUTUBE_API_KEY,
          q: youtubeSearchQuery,
          part: "snippet",
          maxResults: MAX_RESULTS_PER_SOURCE,
          type: "video",
        },
      }),
      axios.get<SerpApiResponse>(SERP_API_URL, {
        params: {
          engine: "google",
          q: serpSearchQuery,
          api_key: SERP_API_KEY,
        },
      }),
    ]);

    const videos = parseYouTubeItems(ytRes.data.items || []);
    const documents = parseSerpResults(serpRes.data.organic_results || []);

    console.log(`[COURSEGEN] Found ${videos.length} videos and ${documents.length} documents for "${prompt}".`);

    res.status(200).json({
      title: `Learning Path for: ${prompt}`,
      videos,
      documents,
    });
  } catch (error: any) {
    console.error(`[COURSEGEN] FAILED for prompt: "${prompt}". Error:`, error.message);
    if (error.response) {
      console.error("API Response Data:", error.response.data);
    }

    res.status(500).json({
      error: "Sorry, we couldn't generate your course at this time. Please try again later."
    });
  }
};