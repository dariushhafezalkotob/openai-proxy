import express from 'express';
import { config } from 'dotenv';
import OpenAI from 'openai';

config();
const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

app.post('/chat', async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userPrompt }]
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to connect to OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
