import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* KMRL Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">KMRL</h3>
            <p className="text-primary-foreground/80 text-sm">
              Kochi Metro Rail Limited - Document Management System for efficient
              handling of organizational documents and streamlined operations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <NavLink to="/" className="block text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                Home
              </NavLink>
              <NavLink to="/chatbot" className="block text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                Chatbot
              </NavLink>
              <NavLink to="/database" className="block text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                Database
              </NavLink>
              <NavLink to="/about" className="block text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                About
              </NavLink>
              <NavLink to="/privacy-policy" className="block text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                Privacy Policy
              </NavLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>Smart Innovation Hub 2025</p>
              <p>Kerala Government</p>
              <p>support@kmrl.gov.in</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2025 Kochi Metro Rail Limited. All rights reserved. | SIH 2025 Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;