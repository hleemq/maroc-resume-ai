import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, FileCheck } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by AI
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Build Your Perfect
                <span className="block bg-gradient-gold bg-clip-text text-transparent">
                  Resume in Minutes
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Create professional, ATS-friendly resumes tailored for the Moroccan job market. 
                Available in Arabic, French, and English.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                Create Your Resume
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroSecondary" size="lg">
                Upload Existing CV
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="flex items-center text-white/90">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">10,000+ Users</span>
              </div>
              <div className="flex items-center text-white/90">
                <FileCheck className="w-5 h-5 mr-2" />
                <span className="text-sm">ATS-Optimized</span>
              </div>
              <div className="flex items-center text-white/90">
                <Sparkles className="w-5 h-5 mr-2" />
                <span className="text-sm">AI-Enhanced</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant animate-float">
              <img 
                src={heroImage}
                alt="CVBuilder.ma - Professional Resume Builder"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gold text-gold-foreground px-4 py-2 rounded-full shadow-gold text-sm font-semibold animate-glow">
              AI-Powered
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-foreground px-4 py-2 rounded-full shadow-soft text-sm font-semibold">
              Free to Start
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};