import { GoogleGenerativeAI } from "@google/generative-ai";

const API = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generate(prompt, userQuery) {
  try {
    const fullQuery = `${prompt} ${userQuery}`;
    const result = await model.generateContent(fullQuery);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!API) {
      return res.status(500).json({ error: "API key is missing" });
    }

    try {
      const prompt = `You are a friendly and efficient customer support assistant. Provide clear, accurate, and concise answers to users' questions or issues. Keep responses informative and limited to 1-2 lines`;

      const responseText = await generate(prompt, message);

      res.status(200).json({ reply: responseText });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
