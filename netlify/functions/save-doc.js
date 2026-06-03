const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
  if(event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  // Get user from Netlify Identity context
  const { user } = context.clientContext || {};
  
  if(!user) {
    return { 
      statusCode: 401, 
      body: JSON.stringify({ error: 'Not authenticated - no user in context' }) 
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if(!supabaseUrl || !supabaseKey) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Missing Supabase config' }) 
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = JSON.parse(event.body);
    const { id, type, title, doc_number, client_name, total, status, due_date, data } = body;
    const userId = user.sub;

    if(id) {
      const { data: doc, error } = await supabase
        .from('documents')
        .update({ 
          type: type || 'invoice', 
          title: title || 'Untitled', 
          doc_number, 
          client_name, 
          total: total || 0, 
          status: status || 'draft', 
          due_date: due_date || null, 
          data,
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();
      
      if(error) throw error;
      return { statusCode: 200, body: JSON.stringify({ doc }) };
    } else {
      const { data: doc, error } = await supabase
        .from('documents')
        .insert({ 
          user_id: userId, 
          type: type || 'invoice', 
          title: title || 'Untitled', 
          doc_number, 
          client_name, 
          total: total || 0, 
          status: status || 'draft', 
          due_date: due_date || null, 
          data 
        })
        .select()
        .single();
      
      if(error) throw error;
      return { statusCode: 200, body: JSON.stringify({ doc }) };
    }
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
