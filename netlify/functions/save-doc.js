const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
  if(event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  
  const { user } = context.clientContext;
  if(!user) return { statusCode: 401, body: JSON.stringify({ error: 'Not authenticated' }) };

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  try {
    const body = JSON.parse(event.body);
    const { id, type, title, doc_number, client_name, total, status, due_date, data } = body;

    if(id) {
      // Update existing
      const { data: doc, error } = await supabase
        .from('documents')
        .update({ type, title, doc_number, client_name, total, status, due_date, data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.sub)
        .select().single();
      if(error) throw error;
      return { statusCode: 200, body: JSON.stringify({ doc }) };
    } else {
      // Insert new
      const { data: doc, error } = await supabase
        .from('documents')
        .insert({ user_id: user.sub, type, title, doc_number, client_name, total, status: status||'draft', due_date, data })
        .select().single();
      if(error) throw error;
      return { statusCode: 200, body: JSON.stringify({ doc }) };
    }
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
