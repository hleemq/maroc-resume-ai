import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PersonalInfoStep } from '@/components/builder/PersonalInfoStep';
import { ExperienceStep } from '@/components/builder/ExperienceStep';
import { EducationStep } from '@/components/builder/EducationStep';
import { SkillsStep } from '@/components/builder/SkillsStep';
import { SummaryStep } from '@/components/builder/SummaryStep';
import { TemplateSelectionStep } from '@/components/builder/TemplateSelectionStep';
import { createResume, getResumeTemplates } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { ResumeData, createEmptyResumeData } from '@/lib/resumeUtils';

const STEPS = [
  { key: 'personal', title: 'Personal Information', description: 'Name and basic information' },
  { key: 'experience', title: 'Work Experience', description: 'Your professional history and previous jobs' },
  { key: 'education', title: 'Education', description: 'Academic qualifications and certificates' },
  { key: 'skills', title: 'Skills', description: 'Technical and personal skills' },
  { key: 'summary', title: 'Professional Summary', description: 'Overview of your experience and goals' },
  { key: 'template', title: 'Choose Template', description: 'Select a professional template for your resume' },
];


export default function BuilderNew() {
  const navigate = useNavigate();
  const { user, loading, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResumeData());

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      // Pre-fill user data  
      setResumeData(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
        }
      }));
    }
  }, [user, loading, navigate]);


  const updateResumeData = (step: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Personal
        return resumeData.personal.fullName && resumeData.personal.email;
      case 1: // Experience
        return true; // Experience is optional
      case 2: // Education
        return true; // Education is optional
      case 3: // Skills
        return true; // Skills are optional
      case 4: // Summary
        return true; // Summary is optional
      case 5: // Template
        return selectedTemplate !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select a template for your resume",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await createResume({
        title: resumeData.personal.fullName + ' - Resume',
        template_id: selectedTemplate,
        content: resumeData,
        language: 'en',
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create resume",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your resume has been created successfully",
      });

      // Navigate to the resume preview page
      navigate(`/resume/${data.id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={resumeData.personal}
            onChange={(data) => updateResumeData('personal', data)}
          />
        );
      case 1:
        return (
          <ExperienceStep
            data={resumeData.experience}
            onChange={(data) => updateResumeData('experience', data)}
            subscribed={profile?.subscription_tier !== 'free'}
          />
        );
      case 2:
        return (
          <EducationStep
            data={resumeData.education}
            onChange={(data) => updateResumeData('education', data)}
            subscribed={profile?.subscription_tier !== 'free'}
          />
        );
      case 3:
        return (
          <SkillsStep
            data={resumeData.skills}
            onChange={(data) => updateResumeData('skills', data)}
            subscribed={profile?.subscription_tier !== 'free'}
          />
        );
      case 4:
        return (
          <SummaryStep
            data={resumeData.summary}
            onChange={(data) => updateResumeData('summary', data)}
            subscribed={profile?.subscription_tier !== 'free'}
          />
        );
      case 5:
        return (
          <TemplateSelectionStep
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            resumeData={resumeData}
            subscriptionTier={profile?.subscription_tier}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Create New Resume</h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">{STEPS[currentStep].title}</h2>
                <p className="text-sm text-muted-foreground">{STEPS[currentStep].description}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {currentStep + 1} of {STEPS.length}
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2">
                {STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              {currentStep === STEPS.length - 1 ? (
                <Button
                  onClick={handleFinish}
                  disabled={!canProceed() || isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Resume'}
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}