import fs from 'fs';
import path from 'path';
import Stripe from 'stripe';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { session_id } = req.query;

  if (!session_id) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(400).send('<h1>400 Bad Request</h1><p>Missing session_id</p>');
  }

  let verified = false;
  let formationId = null;

  if (session_id.startsWith('cs_test_mock_')) {
    const parts = session_id.split('_');
    formationId = parts[3];
    verified = true;
  } else {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey && !stripeKey.startsWith('sk_test_your')) {
      try {
        const stripe = new Stripe(stripeKey);
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (session.payment_status === 'paid') {
          formationId = session.metadata.formation;
          verified = true;
        }
      } catch (err) {
        console.error('[download-guide] Stripe verification failed:', err);
      }
    }
  }

  if (verified && formationId) {
    const fileName = `complete-${formationId}-implementation-guide.html`;
    // Resolve guide path relative to project root
    const filePath = path.join(process.cwd(), 'downloads', fileName);

    try {
      if (fs.existsSync(filePath)) {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(htmlContent);
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(404).send(`<h1>404 Not Found</h1><p>Guide file not found for formation ${formationId}</p>`);
      }
    } catch (err) {
      console.error('[download-guide] File read failed:', err);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(500).send('<h1>500 Internal Server Error</h1><p>Failed to load guide file</p>');
    }
  } else {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(403).send('<h1>403 Forbidden</h1><p>Access denied. Payment verification failed.</p>');
  }
}
