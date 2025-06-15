import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Give me a short JSON with:
- a one-line fun fortune
- a palette of 5 hex colors that match the mood

Format:
{
  "fortune": "Today is made of neon dreams.",
  "colors": ["#ff00cc", "#cc00ff", "#9900ff", "#6600cc", "#330099"]
}`,
        },
      ],
      temperature: 1.2,
    });

    const text = response.choices[0].message.content.trim();
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate colorcast" });
  }
}