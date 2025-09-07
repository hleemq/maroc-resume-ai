import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, FileText, Sparkles, Crown } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">CVBuilder.ma</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Crown className="w-4 h-4 mr-2" />
                Go Premium
              </Button>
              <div className="w-8 h-8 bg-gradient-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Welcome back! Ready to build your next resume?
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create professional resumes or enhance your existing CV with AI-powered suggestions.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Create New Resume */}
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Create New Resume</CardTitle>
                <CardDescription>
                  Start from scratch with our professional templates
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full" size="lg">
                  Get Started
                </Button>
                <div className="flex items-center justify-center mt-3 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 mr-1" />
                  3 AI generations remaining
                </div>
              </CardContent>
            </Card>

            {/* Upload Existing CV */}
            <Card className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-accent/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Upload Existing CV</CardTitle>
                <CardDescription>
                  Enhance your current resume with AI improvements
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="accent" className="w-full" size="lg">
                  Upload & Enhance
                </Button>
                <div className="flex items-center justify-center mt-3 text-sm text-muted-foreground">
                  PDF, DOC, DOCX supported
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Resumes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Your Recent Resumes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "Software Engineer Resume", date: "2 days ago", status: "Draft" },
                { name: "Marketing Manager CV", date: "1 week ago", status: "Complete" },
                { name: "Project Manager Resume", date: "2 weeks ago", status: "Complete" },
              ].map((resume, index) => (
                <Card key={index} className="hover:shadow-soft transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">{resume.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resume.status === 'Complete' 
                            ? 'bg-accent/10 text-accent' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {resume.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{resume.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};