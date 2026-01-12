export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, data, level = 'info' } = req.body;
  const timestamp = new Date().toISOString();

  // Select console method based on level
  const logMethod = level === 'error' ? console.error : console.log;

  // This output will appear in Vercel's "Runtime Logs"
  logMethod(`[CLIENT-LOG] ${timestamp} - ${message}`);
  if (data) {
    logMethod(JSON.stringify(data, null, 2));
  }

  res.status(200).json({ status: 'ok' });
}
