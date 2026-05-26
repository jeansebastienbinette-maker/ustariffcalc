export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const response = await fetch(
      'https://api.beehiiv.com/v2/publications/pub_16275c12-7672-4837-b3ed-cd529e722d68/subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer KGrxpxlVBSQtPZo7voOX04Zd1724g329IgYVYSdKJ7GKEp1yuSX0mpdveeMG63kE'
        },
        body: JSON.stringify({
          email: email,
          utm_source: 'ustariffcalc',
          utm_medium: 'website',
          referring_site: 'https://ustariffcalc.com'
        })
      }
    );

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
