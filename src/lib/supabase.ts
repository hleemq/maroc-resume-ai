import { supabase } from "@/integrations/supabase/client";

// Auth functions
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

// Resume functions
export const createResume = async (resumeData: {
  title: string;
  template_id?: string;
  content: any;
  language?: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  
  const { data, error } = await supabase
    .from('resumes')
    .insert({
      ...resumeData,
      user_id: user.id,
    })
    .select()
    .single();
  
  return { data, error };
};

export const updateResume = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('resumes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const getUserResumes = async () => {
  const { data, error } = await supabase
    .from('resumes')
    .select(`
      *,
      resume_templates (
        name,
        is_premium
      )
    `)
    .order('updated_at', { ascending: false });
  
  return { data, error };
};

export const deleteResume = async (id: string) => {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id);
  
  return { error };
};

// Template functions
export const getResumeTemplates = async () => {
  const { data, error } = await supabase
    .from('resume_templates')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Profile functions
export const getUserProfile = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .select()
    .single();
  
  return { data, error };
};

// AI functions
export const generateAIContent = async (contentType: string, inputData: any, language = 'en', resumeId?: string) => {
  const { data, error } = await supabase.functions.invoke('ai-generate-content', {
    body: {
      content_type: contentType,
      input_data: inputData,
      language,
      resume_id: resumeId
    }
  });
  
  return { data, error };
};

// File upload functions
export const uploadCV = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const { data, error } = await supabase.functions.invoke('upload-cv', {
    body: formData
  });
  
  return { data, error };
};

// Subscription functions
export const createCheckoutSession = async (plan = 'premium') => {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: { plan }
  });
  
  return { data, error };
};

export const checkSubscription = async () => {
  const { data, error } = await supabase.functions.invoke('check-subscription');
  return { data, error };
};

// Real-time subscriptions
export const subscribeToUserResumes = (callback: (payload: any) => void) => {
  return supabase
    .channel('user_resumes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'resumes',
        filter: `user_id=eq.${supabase.auth.getUser().then(({data}) => data.user?.id)}`
      }, 
      callback
    )
    .subscribe();
};

export { supabase };