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
          content: `Respond only with a valid JSON object. No backticks. No extra text.
          
          Return:
          - a one-line fortune in both Korean and English (absurd, funny, and oddly specific — e.g., "비둘기 똥을 조심하세요" / "Watch out for pigeon poop today")
          - a palette of 5 hex colors that match the mood or theme of the fortune (e.g., if the fortune is about pigeons, use colors like sky blue, gray, brown, etc.)

          Format:
          {
            "fortune_kr": "비둘기 똥을 조심하세요",
            "fortune_en": "Watch out for pigeon poop today",
            "colors": ["#a2d2ff", "#d3d3d3", "#6c757d", "#a0522d", "#87ceeb"]
          }

          Keep it playful, unexpected, and weirdly realistic`,
  },
],
      temperature: 1.2,
    });

    const text = response.choices[0].message.content.trim();
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (error) {
  console.error("OpenAI API Error:", error);
  res.status(500).json({ error: "Failed to generate colorcast", details: error.message });
}
}

