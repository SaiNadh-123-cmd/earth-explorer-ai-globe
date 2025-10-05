import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

        {/* Ad Space - Top Banner */}
        <div className="mb-8">
          <div className="p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center">
            <p className="text-sm text-muted-foreground">Advertisement Space - 728x90</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground text-lg mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using GeoSphere 360° ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms and Conditions, please do not use this Service.
            </p>
          </section>

          {/* Ad Space - In-content */}
          <div className="my-8">
            <div className="p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center">
              <p className="text-sm text-muted-foreground">Advertisement Space - 336x280</p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily access the materials (information, geographic data, and visualizations) on GeoSphere 360° for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-muted-foreground mb-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by GeoSphere 360° at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Use the Service in compliance with all applicable laws and regulations</li>
              <li>Not use the Service for any unlawful or prohibited purpose</li>
              <li>Not attempt to gain unauthorized access to any portion of the Service</li>
              <li>Not transmit any viruses, malware, or other malicious code</li>
              <li>Respect the intellectual property rights of the Service and third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Geographic Data and Accuracy</h2>
            <p className="text-muted-foreground mb-4">
              While we strive to provide accurate geographic information and visualizations, GeoSphere 360° does not guarantee the accuracy, completeness, or timeliness of any geographic data, maps, or location information provided through the Service.
            </p>
            <p className="text-muted-foreground mb-4">
              Users should not rely solely on our Service for critical navigation, planning, or decision-making purposes.
            </p>
          </section>

          {/* Ad Space - In-content */}
          <div className="my-8">
            <div className="p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center">
              <p className="text-sm text-muted-foreground">Advertisement Space - 300x250</p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. API Keys and Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              The Service may require you to provide your own API keys for certain features (such as Google Maps). You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Obtaining and maintaining valid API keys</li>
              <li>Complying with the terms of service of third-party API providers</li>
              <li>Any costs associated with API usage</li>
              <li>Keeping your API keys secure and confidential</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The Service and its original content, features, and functionality are owned by GeoSphere 360° and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground mb-4">
              Geographic data, imagery, and maps may be provided by third-party sources and are subject to their respective licenses and terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Advertisements</h2>
            <p className="text-muted-foreground mb-4">
              The Service displays third-party advertisements. We are not responsible for the content of these advertisements or the products and services they promote. Your interactions with advertisers are solely between you and the advertiser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall GeoSphere 360° or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Modifications to Terms</h2>
            <p className="text-muted-foreground mb-4">
              GeoSphere 360° reserves the right to revise these Terms and Conditions at any time. By continuing to use the Service after changes are posted, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms and Conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="text-primary">
              <a href="mailto:podcastonrealincidents@gmail.com" className="hover:underline">
                podcastonrealincidents@gmail.com
              </a>
            </p>
          </section>
        </div>

        {/* Ad Space - Bottom Banner */}
        <div className="mt-8">
          <div className="p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center">
            <p className="text-sm text-muted-foreground">Advertisement Space - 728x90</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;