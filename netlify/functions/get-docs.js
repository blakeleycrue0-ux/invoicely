const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
  const { user } = context.clientContext;
  if(!user) return { statusCode: 401, body: JSON.stringify({ error: 'Not authenticated' }) };

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    const { data: docs, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.sub)
      .order('created_at', { ascending: false });
    if(error) throw error;
    return { statusCode: 200, body: JSON.stringify({ docs: docs || [] }) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
