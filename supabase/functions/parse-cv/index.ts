import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabase.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new Error('No file provided');
    }

    console.log('Processing file:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Store file upload record
    const { data: fileRecord, error: fileError } = await supabase
      .from('file_uploads')
      .insert({
        user_id: user.id,
        filename: file.name,
        file_path: `uploads/${user.id}/${Date.now()}-${file.name}`,
        mime_type: file.type,
        file_size: file.size,
        status: 'processing'
      })
      .select()
      .single();

    if (fileError) {
      console.error('Error storing file record:', fileError);
      throw fileError;
    }

    // Simple text extraction (for demo - in production you'd use a proper PDF/DOCX parser)
    const fileText = await file.text();
    
    // Basic extraction using simple patterns
    const extractedData = extractResumeData(fileText);

    // Update file record with extracted content
    await supabase
      .from('file_uploads')
      .update({
        extracted_content: JSON.stringify(extractedData),
        status: 'completed'
      })
      .eq('id', fileRecord.id);

    console.log('Successfully extracted data from CV');

    return new Response(JSON.stringify({
      success: true,
      fileId: fileRecord.id,
      extractedData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in parse-cv function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractResumeData(text: string) {
  // Simple extraction patterns - in production, use a proper CV parser
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Extract name (usually first non-empty line)
  const name = lines[0] || '';
  
  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';
  
  // Extract phone
  const phoneMatch = text.match(/(\+?[\d\s\-\(\)]{10,})/);
  const phone = phoneMatch ? phoneMatch[0] : '';
  
  // Extract skills (look for keywords)
  const skillKeywords = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'HTML', 'CSS', 'TypeScript', 'Java', 'C++'];
  const foundSkills = skillKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
  
  // Simple experience extraction
  const experienceKeywords = ['experience', 'work', 'employment', 'career'];
  const hasExperience = experienceKeywords.some(keyword => 
    text.toLowerCase().includes(keyword)
  );
  
  return {
    personal: {
      fullName: name,
      email: email,
      phone: phone,
      location: '', // Could extract from address patterns
    },
    experience: hasExperience ? [{
      company: 'Extracted Company',
      position: 'Extracted Position',
      startDate: '',
      endDate: '',
      description: 'Experience details extracted from CV'
    }] : [],
    education: [{
      institution: 'Extracted Institution',
      degree: 'Extracted Degree',
      startDate: '',
      endDate: '',
      description: 'Education details extracted from CV'
    }],
    skills: foundSkills.length > 0 ? foundSkills.map(skill => ({ name: skill, level: 'Intermediate' })) : [],
    summary: 'Professional summary extracted from uploaded CV'
  };
}