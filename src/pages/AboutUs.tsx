import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, Layers, Map, Users } from "lucide-react";

const AboutUs = () => {
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
          <h1 className="text-4xl font-bold mb-2">About GeoSphere 360°</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Exploring Earth's wonders through interactive visualization
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              GeoSphere 360° is dedicated to making geographical, environmental, and geological knowledge accessible to everyone 
              through immersive 3D visualization. We believe that understanding our planet is the first step toward protecting 
              and preserving it for future generations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="p-6 bg-muted/30 rounded-lg">
                <Globe className="h-8 w-8 mb-3 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Interactive 3D Globe</h3>
                <p className="text-sm text-muted-foreground">
                  Explore Earth in stunning 3D with smooth navigation and real-time rendering of geographical features.
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <Layers className="h-8 w-8 mb-3 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Multiple Data Layers</h3>
                <p className="text-sm text-muted-foreground">
                  Toggle between political borders, biomes, tectonic plates, and weather systems to understand Earth's complexity.
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <Map className="h-8 w-8 mb-3 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Advanced Mapping</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by cutting-edge mapping technology to provide accurate and detailed geographical information.
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <Users className="h-8 w-8 mb-3 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Educational Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Designed for students, educators, researchers, and anyone curious about our planet's features and systems.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              GeoSphere 360° was created with the vision of democratizing access to geographical and environmental data. 
              In an age where understanding climate change, ecosystems, and Earth's natural systems has never been more critical, 
              we recognized the need for an intuitive, visual platform that makes this information accessible to everyone.
            </p>
            <p className="mb-4">
              Our team combines expertise in geography, data visualization, web development, and user experience design to 
              create an application that is both powerful and easy to use. We continuously update our data sources and features 
              to provide the most current and comprehensive view of our planet.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                <strong>Accessibility:</strong> Making complex geographical data understandable for all audiences
              </li>
              <li className="mb-2">
                <strong>Accuracy:</strong> Maintaining high standards for data quality and reliability
              </li>
              <li className="mb-2">
                <strong>Education:</strong> Fostering learning and curiosity about Earth's natural systems
              </li>
              <li className="mb-2">
                <strong>Innovation:</strong> Continuously improving visualization techniques and user experience
              </li>
              <li className="mb-2">
                <strong>Sustainability:</strong> Promoting environmental awareness and planetary stewardship
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technology</h2>
            <p className="mb-4">
              GeoSphere 360° leverages modern web technologies including 3D rendering engines, real-time data processing, 
              and responsive design to deliver a seamless experience across devices. Our platform integrates data from 
              multiple trusted sources to provide comprehensive geographical insights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">
              We welcome feedback, suggestions, and questions from our users. Whether you're an educator looking to integrate 
              GeoSphere 360° into your curriculum, a researcher interested in our data sources, or simply curious about our 
              platform, we'd love to hear from you.
            </p>
            <p className="mb-4">
              Contact us at:{" "}
              <a href="mailto:podcastonrealincidents@gmail.com" className="text-primary hover:underline">
                podcastonrealincidents@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Future Development</h2>
            <p className="mb-4">
              We are constantly working on new features and improvements, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Enhanced real-time weather visualization</li>
              <li>Historical climate data and time-series analysis</li>
              <li>Augmented reality features for mobile devices</li>
              <li>Collaborative tools for educational institutions</li>
              <li>Expanded data layers including ocean currents and air quality</li>
            </ul>
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

export default AboutUs;
