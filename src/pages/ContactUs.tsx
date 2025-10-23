import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const mailtoLink = `mailto:podcastonrealincidents@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening email client",
      description: "Your default email application will open with the message.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <Mail className="h-8 w-8 mb-3 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">
                For general inquiries, support, or feedback:
              </p>
              <a 
                href="mailto:podcastonrealincidents@gmail.com" 
                className="text-primary hover:underline font-medium"
              >
                podcastonrealincidents@gmail.com
              </a>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg">
              <MessageSquare className="h-8 w-8 mb-3 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Response Time</h3>
              <p className="text-muted-foreground">
                We typically respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">How do I report a bug or technical issue?</h3>
              <p className="text-sm text-muted-foreground">
                Please email us with a detailed description of the issue, including your browser type, device, and steps to reproduce the problem.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can I use GeoSphere 360° for commercial purposes?</h3>
              <p className="text-sm text-muted-foreground">
                Please contact us to discuss licensing options for commercial use of our platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">How can I suggest new features?</h3>
              <p className="text-sm text-muted-foreground">
                We welcome feature suggestions! Please email us with your ideas and we'll consider them for future updates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Is there an API available for developers?</h3>
              <p className="text-sm text-muted-foreground">
                We're currently developing API access. Contact us to express your interest and we'll notify you when it becomes available.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">What browsers are supported?</h3>
              <p className="text-sm text-muted-foreground">
                GeoSphere 360° works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for optimal performance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can I embed GeoSphere 360° on my website?</h3>
              <p className="text-sm text-muted-foreground">
                Embedding options are available for educational institutions and organizations. Please contact us to discuss your specific needs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Support Resources</h2>
          <p className="mb-4">
            Before contacting us, you may find answers in our comprehensive documentation and help resources:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>User guides and tutorials for getting started with the 3D globe interface</li>
            <li>Layer explanations covering political borders, biomes, and tectonic plates</li>
            <li>Search functionality tips for finding specific locations quickly</li>
            <li>API key setup instructions for Google Maps integration</li>
            <li>Troubleshooting common issues with performance and display</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
