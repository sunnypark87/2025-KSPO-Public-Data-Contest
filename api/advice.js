export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
  }

  const { resultData } = req.body || {};
  if (!resultData) {
    return res.status(400).json({ error: 'Missing resultData' });
  }

  try {
    const systemPrompt =
      'You are a friendly running coach. Analyze the user\'s current fitness/health status ' +
      'based on the provided results, then give advice for better running. ' +
      'Write 1-2 short lines in Korean ONLY. Do not use any English words. ' +
      'If any part is not Korean, rewrite it fully in Korean. ' +
      'Use the full result data provided. Be supportive and specific. ' +
      'Avoid medical diagnosis, guarantees, or unsafe advice. No markdown.';

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: systemPrompt }],
          },
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: `Result data JSON:\n${JSON.stringify(resultData)}`,
              },
            ],
          },
        ],
        max_output_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI error:', data);
      return res.status(500).json({ error: 'OpenAI request failed' });
    }

    let text = typeof data.output_text === 'string' ? data.output_text : '';
    if (!text && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item && Array.isArray(item.content)) {
          for (const part of item.content) {
            if (
              part &&
              (part.type === 'output_text' || part.type === 'summary_text') &&
              typeof part.text === 'string'
            ) {
              text = part.text;
              break;
            }
          }
        }
        if (text) break;
      }
    }

    const cleaned = String(text || '').trim();
    const lines = cleaned
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const shortText = lines.slice(0, 2).join('\n').slice(0, 220).trim();

    return res.status(200).json({ advice: shortText });
  } catch (error) {
    console.error('Advice handler error:', error);
    return res.status(500).json({ error: 'Advice generation failed' });
  }
}
