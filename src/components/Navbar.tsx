import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { History, User, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import docuMetroLogo from "@/assets/documetro-logo.png";
import sihLogo from "@/assets/sih-logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t('nav.home') },
    { to: "/chatbot", label: t('nav.chatbot') },
    { to: "/database", label: t('nav.database') },
    { to: "/about", label: t('nav.about') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ml' : 'en');
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={docuMetroLogo} alt="DocuMetro" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-foreground">DocuMetro</h1>
              <p className="text-xs text-muted-foreground">KMRL</p>
            </div>
            <img src={sihLogo} alt="Smart India Hackathon 2025" className="w-12 h-8 ml-2" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-muted-foreground hover:text-primary flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {t('nav.language')}
            </Button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/history")}
              className="text-muted-foreground hover:text-primary"
              title={t('nav.history')}
            >
              <History className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="text-muted-foreground hover:text-primary"
              title={t('nav.profile')}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="md:hidden text-muted-foreground hover:text-primary"
              title={t('nav.language')}
            >
              <Globe className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-base ${isActive ? "text-primary bg-accent font-semibold" : "text-foreground hover:text-primary hover:bg-accent"} transition-colors`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* Mobile Language Toggle in Menu */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                🌐 {t('nav.language')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;