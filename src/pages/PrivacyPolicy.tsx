import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Ad Space - Top */}
        <div className="mb-8 p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 text-center">
          <p className="text-sm text-muted-foreground">Advertisement Space - 728x90</p>
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              GeoSphere 360° is committed to protecting your privacy. We collect and process the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Usage data and analytics to improve our services</li>
              <li>Device information and browser type</li>
              <li>Location data when you use our mapping features</li>
              <li>Search queries and interactions with the application</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our geographical visualization services</li>
              <li>Improve user experience and application functionality</li>
              <li>Analyze usage patterns and trends</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our service and store certain information. 
              These technologies help us analyze web traffic and improve our services. You can instruct your browser to refuse 
              all cookies or indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p className="mb-4">
              Our application uses third-party services including Google AdSense for advertisements and Mapbox for mapping 
              services. These services may collect information used to identify you. We encourage you to review the privacy 
              policies of these third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission 
              over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of certain data collection practices</li>
              <li>Withdraw consent where applicable</li>
              <li>Lodge a complaint with data protection authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
            <p className="mb-4">
              Our service is not directed to individuals under the age of 13. We do not knowingly collect personal information 
              from children under 13. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
              Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:podcastonrealincidents@gmail.com" className="text-primary hover:underline">
                podcastonrealincidents@gmail.com
              </a>
            </p>
          </section>
        </article>

        {/* Ad Space - Bottom */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 text-center">
          <p className="text-sm text-muted-foreground">Advertisement Space - 728x90</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
