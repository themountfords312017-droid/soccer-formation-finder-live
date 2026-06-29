import Stripe from 'stripe';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formationId, email } = req.body;

    if (!formationId) {
      return res.status(400).json({ error: 'Missing formationId' });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const isMock = !stripeKey || stripeKey.startsWith('sk_test_your') || stripeKey === 'sk_test_51...';

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:8000';
    const origin = `${protocol}://${host}`;

    if (isMock) {
      const mockSessionId = `cs_test_mock_${formationId}_${Math.random().toString(36).substring(2, 10)}`;
      const mockUrl = `${origin}/#/success?session_id=${mockSessionId}`;
      return res.status(200).json({ url: mockUrl, isMock: true });
    }

    const stripe = new Stripe(stripeKey);
    const productName = `Complete ${formationId} Implementation Guide`;
    const successUrl = `${origin}/#/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/#/results`;

    const sessionData = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: 999, // $9.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        formation: formationId,
        guide_file: `complete-${formationId}-implementation-guide.pdf`,
        product_name: productName,
      },
    };

    if (email) {
      sessionData.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionData);
    return res.status(200).json({ url: session.url, isMock: false });
  } catch (error) {
    console.error('[create-checkout-session] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
