export default async function handler(req, res) {
  const apiKey = process.env.NEWS_API_KEY;
  const query = req.query.query || 'India';

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`);

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Error from NewsAPI' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
