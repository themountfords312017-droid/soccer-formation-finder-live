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
    return res.status(400).json({ error: 'Missing session_id' });
  }

  if (session_id.startsWith('cs_test_mock_')) {
    const parts = session_id.split('_');
    const formationId = parts[3] || '4-3-3';
    return res.status(200).json({
      verified: true,
      formationId,
      productName: `Complete ${formationId} Implementation Guide`,
    });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey || stripeKey.startsWith('sk_test_your')) {
    return res.status(400).json({ error: 'Stripe secret key not configured, and session is not mock' });
  }

  try {
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const formationId = session.metadata.formation;
      const productName = session.metadata.product_name;
      return res.status(200).json({ verified: true, formationId, productName });
    } else {
      return res.status(200).json({ verified: false, error: 'Session is unpaid' });
    }
  } catch (error) {
    console.error('[verify-session] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
