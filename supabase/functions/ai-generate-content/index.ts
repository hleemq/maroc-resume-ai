import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { content_type, input_data, language = 'en', resume_id } = await req.json();

    // Check user's AI generations remaining
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('ai_generations_remaining, subscription_tier')
      .eq('id', user.id)
      .single();

    if (!profile || profile.ai_generations_remaining <= 0) {
      return new Response(
        JSON.stringify({ error: "No AI generations remaining. Please upgrade to premium." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 402 }
      );
    }

    // Get OpenAI API key from secrets
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    let prompt = "";
    let generatedContent = "";

    switch (content_type) {
      case "professional_summary":
        prompt = `Create a professional summary for a CV in ${language} language. 
        Input: ${JSON.stringify(input_data)}
        Requirements:
        - 2-3 sentences maximum
        - Professional tone
        - Highlight key skills and experience
        - Tailored for Moroccan job market
        - Language: ${language === 'ar' ? 'Arabic' : language === 'fr' ? 'French' : 'English'}`;
        break;

      case "job_description":
        prompt = `Enhance this job experience description for a CV in ${language} language.
        Input: ${JSON.stringify(input_data)}
        Requirements:
        - Use action verbs and quantifiable achievements
        - Professional format suitable for ATS systems
        - Highlight impact and results
        - Maximum 3-4 bullet points
        - Language: ${language === 'ar' ? 'Arabic' : language === 'fr' ? 'French' : 'English'}`;
        break;

      case "skills_optimization":
        prompt = `Optimize and categorize these skills for a CV in ${language} language.
        Input: ${JSON.stringify(input_data)}
        Requirements:
        - Categorize into technical and soft skills
        - Add relevant keywords for ATS optimization
        - Format as a clean list
        - Include industry-relevant skills
        - Language: ${language === 'ar' ? 'Arabic' : language === 'fr' ? 'French' : 'English'}`;
        break;

      default:
        throw new Error("Invalid content type");
    }

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert CV writer specializing in the Moroccan job market. Create professional, ATS-optimized content."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    generatedContent = openaiData.choices[0].message.content;

    // Record AI generation
    await supabaseClient.from('ai_generations').insert({
      user_id: user.id,
      resume_id: resume_id,
      generation_type: content_type,
      input_data: input_data,
      output_data: { content: generatedContent },
      tokens_used: openaiData.usage?.total_tokens || 0
    });

    // Decrease AI generations remaining for free users
    if (profile.subscription_tier === 'free') {
      await supabaseClient
        .from('profiles')
        .update({ ai_generations_remaining: profile.ai_generations_remaining - 1 })
        .eq('id', user.id);
    }

    return new Response(
      JSON.stringify({ 
        content: generatedContent,
        generations_remaining: profile.subscription_tier === 'free' ? profile.ai_generations_remaining - 1 : -1
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error in ai-generate-content:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});