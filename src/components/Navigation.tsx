import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export const Navigation = ({ onGetStarted, onSignIn }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">CVBuilder.ma</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/templates')} 
              className="text-white/90 hover:text-white transition-colors"
            >
              Templates
            </button>
            <a href="#features" className="text-white/90 hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-white/90 hover:text-white transition-colors">
              Pricing
            </a>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-white hover:bg-white/20" onClick={onSignIn}>
                Sign In
              </Button>
              <Button variant="hero" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-white/10 backdrop-blur-md border-t border-white/20">
            <button 
              onClick={() => navigate('/templates')} 
              className="block text-white/90 hover:text-white transition-colors py-2"
            >
              Templates
            </button>
            <a href="#features" className="block text-white/90 hover:text-white transition-colors py-2">
              Features
            </a>
            <a href="#pricing" className="block text-white/90 hover:text-white transition-colors py-2">
              Pricing
            </a>
            <div className="flex flex-col space-y-3 pt-4">
              <Button variant="ghost" className="text-white hover:bg-white/20" onClick={onSignIn}>
                Sign In
              </Button>
              <Button variant="hero" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};