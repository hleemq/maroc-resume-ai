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

    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only PDF, DOC, and DOCX files are allowed.");
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("File size too large. Maximum size is 10MB.");
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${user.id}/${timestamp}.${fileExtension}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('cv-uploads')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('cv-uploads')
      .getPublicUrl(fileName);

    // Record file upload in database
    const { data: fileRecord, error: dbError } = await supabaseClient
      .from('file_uploads')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_url: publicUrl,
        status: 'processing'
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Process file content extraction (placeholder for now)
    // In a real implementation, you would use libraries like pdf-parse or mammoth
    // to extract text content from PDF/DOC files
    
    let extractedContent = {};
    
    try {
      if (file.type === 'application/pdf') {
        // PDF processing would go here
        extractedContent = { 
          text: "PDF content extraction not implemented yet",
          sections: {
            personal_info: {},
            experience: [],
            education: [],
            skills: []
          }
        };
      } else {
        // DOC/DOCX processing would go here
        extractedContent = { 
          text: "DOC/DOCX content extraction not implemented yet",
          sections: {
            personal_info: {},
            experience: [],
            education: [],
            skills: []
          }
        };
      }

      // Update file record with extracted content
      await supabaseClient
        .from('file_uploads')
        .update({
          extracted_content: extractedContent,
          status: 'completed'
        })
        .eq('id', fileRecord.id);

    } catch (extractionError) {
      console.error('Content extraction failed:', extractionError);
      
      await supabaseClient
        .from('file_uploads')
        .update({ status: 'failed' })
        .eq('id', fileRecord.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        file_id: fileRecord.id,
        file_url: publicUrl,
        extracted_content: extractedContent
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error in upload-cv:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});