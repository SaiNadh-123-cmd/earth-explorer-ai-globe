import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">Disclaimer</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. General Information</h2>
            <p className="mb-4">
              The information provided by GeoSphere 360° ("we," "us," or "our") on our application is for general informational 
              and educational purposes only. All information is provided in good faith, however, we make no representation or 
              warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, 
              or completeness of any information on the application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Geographic Data Accuracy</h2>
            <p className="mb-4">
              GeoSphere 360° provides geographical and environmental data for visualization and educational purposes. While we 
              strive for accuracy, the following should be noted:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Map data and geographical information may not be current or completely accurate</li>
              <li>Political boundaries, biome classifications, and tectonic information are approximate</li>
              <li>Weather data, when displayed, may not reflect real-time conditions</li>
              <li>The application should not be used for navigation, emergency services, or critical decision-making</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. No Professional Advice</h2>
            <p className="mb-4">
              The content provided through GeoSphere 360° does not constitute professional advice. Users should not rely solely 
              on the information provided for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Scientific research or academic purposes without verification</li>
              <li>Navigation or travel planning</li>
              <li>Emergency response or disaster management</li>
              <li>Commercial or business decisions</li>
              <li>Environmental or geological assessments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Content and Links</h2>
            <p className="mb-4">
              Our application may contain links to third-party websites, services, or content providers including mapping services 
              and data sources. We have no control over and assume no responsibility for the content, privacy policies, or practices 
              of any third-party sites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of 
              the use of the application or reliance on any information provided. Your use of the application and reliance on any 
              information is solely at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Technical Issues</h2>
            <p className="mb-4">
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The application will be available at all times or without interruption</li>
              <li>The application will be free from errors, bugs, or technical issues</li>
              <li>Any defects in the application will be corrected</li>
              <li>The application or servers are free of viruses or other harmful components</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Updates and Changes</h2>
            <p className="mb-4">
              We reserve the right to modify, update, or discontinue any aspect of the application at any time without notice. 
              Information displayed may be updated or changed without prior notification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Educational Use Only</h2>
            <p className="mb-4">
              GeoSphere 360° is designed as an educational and visualization tool for learning about Earth's geography, ecosystems, 
              and geological features. It should be used as a supplementary resource and not as a primary or authoritative source 
              for critical information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. User-Generated Content</h2>
            <p className="mb-4">
              Any searches, inputs, or interactions you make with GeoSphere 360° are processed to provide you with relevant results. We do not store search queries for extended periods and do not use them for purposes other than improving our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. External Links and Integrations</h2>
            <p className="mb-4">
              Our application integrates with third-party services including mapping APIs. When you use these features, you may be subject to the terms and policies of those external providers. We encourage you to review their documentation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p className="mb-4">
              If you have any questions regarding this disclaimer, please contact us at:{" "}
              <a href="mailto:podcastonrealincidents@gmail.com" className="text-primary hover:underline">
                podcastonrealincidents@gmail.com
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Disclaimer;
