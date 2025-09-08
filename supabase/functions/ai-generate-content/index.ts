import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AI-GENERATE-CONTENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const { content_type, input_data, language = 'ar' } = await req.json();

    // Generate prompt based on content type
    let prompt = "";
    let systemPrompt = "أنت مساعد ذكي متخصص في كتابة السير الذاتية المهنية للسوق المغربي. اكتب باللغة العربية بشكل مهني ومناسب لأنظمة ATS.";

    switch (content_type) {
      case 'professional_summary':
        prompt = `اكتب ملخصاً مهنياً قوياً ومؤثراً باللغة العربية للسوق المغربي.`;
        break;
      
      case 'experience_description':
        prompt = `اكتب وصفاً مهنياً للخبرة: ${input_data.position} في ${input_data.company}`;
        break;
      
      case 'technical_skills':
        prompt = `اقترح 5-7 مهارات تقنية مناسبة للسوق المغربي. أعط الإجابة كقائمة مفصولة بفواصل.`;
        break;
      
      case 'soft_skills':
        prompt = `اقترح 5-7 مهارات شخصية مناسبة للسوق المغربي. أعط الإجابة كقائمة مفصولة بفواصل.`;
        break;
      
      default:
        throw new Error(`Unsupported content type: ${content_type}`);
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      content: generatedContent,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});