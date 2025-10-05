import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold text-lg">GeoSphere 360°</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Exploring Earth's wonders through interactive 3D visualization and geographical data.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground mb-2">
              For inquiries and support:
            </p>
            <a 
              href="mailto:podcastonrealincidents@gmail.com" 
              className="text-sm text-primary hover:underline"
            >
              podcastonrealincidents@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GeoSphere 360°. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
