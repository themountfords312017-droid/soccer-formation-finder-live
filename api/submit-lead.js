export default async function handler(req, res) {
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
    const { lead, tags } = req.body;

    if (!lead) {
      return res.status(400).json({ error: 'Missing lead data' });
    }

    // Prepare email content
    const name = lead.name;
    const formation = lead.recommendedFormation;
    const attackingShape = lead.attackingShape;
    const defensiveShape = lead.defensiveShape;

    let prioritiesList = '';
    if (lead.priorities && Array.isArray(lead.priorities)) {
      lead.priorities.forEach((p) => {
        prioritiesList += `- ${p}\n`;
      });
    }

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:8000';
    const origin = `${protocol}://${host}`;

    let checkoutLink = `${origin}/api/create-checkout-session?formationId=${formation}`;
    if (lead.email) {
      checkoutLink += `&email=${encodeURIComponent(lead.email)}`;
    }
    const resultsLink = `${origin}/#/results`;

    const emailBody = `Hi ${name},

Your Team Tactical Blueprint is ready.

Based on your answers, your recommended formation is:

${formation}

Recommended attacking shape:
${attackingShape}

Recommended defensive shape:
${defensiveShape}

Your top coaching focus areas:
${prioritiesList}
Your free blueprint gives you the starting point. If you want the full coaching plan, training routine, player roles, match-day checklist, common problems and fixes, and printable player handout, you can download the complete guide below.

Download the Complete ${formation} Guide - $9.99:
${checkoutLink}

Link back to your results:
${resultsLink}

Thanks,
Paul Mountford
Soccer Formation Finder`;

    const emailApiKey = process.env.EMAIL_API_KEY;
    const emailService = process.env.EMAIL_SERVICE || 'resend';
    let senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
    let senderName = process.env.SENDER_NAME || 'Soccer Formation Finder';

    let emailSentReal = false;
    let emailError = null;
    let responseData = null;

    if (emailApiKey) {
      try {
        if (emailService === 'brevo' || emailApiKey.startsWith('xkeysib-')) {
          if (senderEmail === 'onboarding@resend.dev') {
            senderEmail = 'info@soccerformationfinder.com';
          }
          const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': emailApiKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender: { name: senderName, email: senderEmail },
              to: [{ email: lead.email, name: name }],
              subject: 'Your Team Tactical Blueprint Is Ready',
              textContent: emailBody,
            }),
          });
          responseData = await brevoResponse.json();
          if (brevoResponse.ok) {
            emailSentReal = true;
          } else {
            throw new Error(JSON.stringify(responseData));
          }
        } else {
          // Default to Resend
          const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${emailApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: `${senderName} <${senderEmail}>`,
              to: [lead.email],
              subject: 'Your Team Tactical Blueprint Is Ready',
              text: emailBody,
            }),
          });
          responseData = await resendResponse.json();
          if (resendResponse.ok) {
            emailSentReal = true;
          } else {
            throw new Error(JSON.stringify(responseData));
          }
        }
      } catch (err) {
        emailError = err.message;
        console.error('[submit-lead] Email dispatch failed:', err);
      }
    } else {
      console.log('================ [SENT EMAIL SIMULATION] ================');
      console.log(`To: ${lead.email}`);
      console.log(`Subject: Your Team Tactical Blueprint Is Ready`);
      console.log(emailBody);
      console.log('=========================================================');
    }

    return res.status(200).json({
      success: true,
      emailSentReal,
      emailError,
      resData: responseData,
    });
  } catch (error) {
    console.error('[submit-lead] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
