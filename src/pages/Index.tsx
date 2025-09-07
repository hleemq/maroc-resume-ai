import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Templates } from "@/components/Templates";
import { Dashboard } from "@/components/Dashboard";
import { useState } from "react";

const Index = () => {
  const [isLoggedIn] = useState(false); // This will be managed by auth later

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Templates />
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose CVBuilder.ma?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built specifically for the Moroccan job market with cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI-Powered</h3>
              <p className="text-muted-foreground">
                Generate compelling content with our advanced AI in Arabic, French, and English.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🇲🇦</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Morocco-Focused</h3>
              <p className="text-muted-foreground">
                Tailored for Moroccan companies and international firms operating in Morocco.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Create professional resumes in minutes, not hours. Export instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
