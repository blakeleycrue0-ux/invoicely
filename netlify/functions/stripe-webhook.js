// netlify/functions/stripe-webhook.js
// Zero external dependencies — uses only Node built-in crypto.
const crypto = require('crypto');

const SUPABASE_URL   = process.env.SUPABASE_URL;
const SERVICE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

function verifyAndParse(rawBody, sigHeader) {
  const parts = {};
  sigHeader.split(',').forEach(item => {
    const eq = item.indexOf('=');
    const k = item.slice(0, eq), v = item.slice(eq + 1);
    (parts[k] = parts[k] || []).push(v);
  });
  const t = parts.t && parts.t[0];
  const v1 = parts.v1 || [];
  if (!t || !v1.length) throw new Error('Invalid signature header');
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) throw new Error('Timestamp expired');
  const expected = crypto.createHmac('sha256', WEBHOOK_SECRET)
    .update(`${t}.${rawBody}`).digest('hex');
  const valid = v1.some(sig => {
    try { return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex')); }
    catch (e) { return false; }
  });
  if (!valid) throw new Error('Signature mismatch');
  return JSON.parse(rawBody);
}

async function writeUnlock(row, ignore) {
  return fetch(SUPABASE_URL + '/rest/v1/unlocked_users', {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      'Prefer': ignore
        ? 'resolution=ignore-duplicates,return=minimal'
        : 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(row)
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const sig     = event.headers['stripe-signature'];
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body;

  let evt;
  try { evt = verifyAndParse(rawBody, sig); }
  catch (err) {
    console.error('Signature check failed:', err.message);
    return { statusCode: 400, body: 'Bad signature: ' + err.message };
  }

  if (evt.type === 'checkout.session.completed') {
    const s    = evt.data.object;
    const paid = s.payment_status === 'paid' || s.status === 'complete';
    if (paid) {
      const userId = s.client_reference_id || null;
      const email  = (s.customer_details && s.customer_details.email) || s.customer_email || null;

      let res = await writeUnlock(
        { user_id: userId, email: email, unlocked_at: new Date().toISOString() }, false
      );
      if (!res.ok && userId)         res = await writeUnlock({ user_id: userId }, true);
      if (!res.ok && !userId && email) res = await writeUnlock({ email: email }, true);

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        console.error('Supabase write failed', res.status, txt);
        return { statusCode: 500, body: 'DB write failed' };
      }
      console.log('Unlocked:', userId || email);
    }
  }
  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
