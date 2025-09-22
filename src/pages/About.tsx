import { Award, Target, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Zap,
      title: "Intelligent Search",
      description: "AI-powered document search with natural language processing for quick and accurate results."
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description: "Multi-user system with role-based access controls and seamless document sharing."
    },
    {
      icon: Target,
      title: "Efficient Organization",
      description: "Advanced categorization and tagging system for systematic document management."
    },
    {
      icon: Award,
      title: "Government Compliant",
      description: "Built following Kerala government standards with security and compliance in mind."
    }
  ];

  const teamMembers = [
    "Document Management Team",
    "AI/ML Development Team", 
    "UI/UX Design Team",
    "Quality Assurance Team"
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="mb-16">
          <Card className="card-teal">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Problem Statement</CardTitle>
              <CardDescription className="text-center text-base">
                SIH 2025 - Government of Kerala Challenge
              </CardDescription>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed space-y-4">
              <p>
                Kochi Metro Rail Limited (KMRL) faces significant challenges in managing the 
                massive volume of documents generated daily across various departments including 
                operations, maintenance, safety, finance, and administration.
              </p>
              <p>
                The current manual document management processes lead to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Difficulty in locating specific documents quickly</li>
                <li>Redundant storage and version control issues</li>
                <li>Time-consuming manual search processes</li>
                <li>Lack of centralized access and organization</li>
                <li>Inefficient knowledge sharing across departments</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Solution Overview */}
        <section className="mb-16">
          <Card className="card-teal">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Solution</CardTitle>
              <CardDescription className="text-center text-base">
                AI-Powered Document Management System
              </CardDescription>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed space-y-4">
              <p>
                Our intelligent document management system leverages modern web technologies 
                and artificial intelligence to provide a seamless, efficient solution for 
                KMRL's document organization and retrieval needs.
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Key Capabilities:</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Automated document categorization and tagging</li>
                  <li>AI-powered chatbot for instant document queries</li>
                  <li>Advanced search with natural language processing</li>
                  <li>Role-based access control and security</li>
                  <li>Real-time collaboration and document sharing</li>
                  <li>Analytics and reporting for document usage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground">
              Designed specifically for government organizations and metro operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-teal">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <Card className="card-teal">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Technology Stack</CardTitle>
              <CardDescription className="text-center text-base">
                Modern, scalable, and secure technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-3">Frontend</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>React 18</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Vite</li>
                  </ul>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-3">Backend</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB</li>
                    <li>RESTful APIs</li>
                  </ul>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-3">AI/ML</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Natural Language Processing</li>
                    <li>Document Classification</li>
                    <li>Search Algorithms</li>
                    <li>Citation Tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team */}
        <section className="mb-16">
          <Card className="card-teal">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Development Team</CardTitle>
              <CardDescription className="text-center text-base">
                SIH 2025 Participating Team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <div className="w-3 h-3 bg-teal rounded-full"></div>
                    <span className="font-medium text-foreground">{member}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Impact */}
        <section>
          <Card className="card-teal">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Expected Impact</CardTitle>
              <CardDescription className="text-center text-base">
                Transforming document management for KMRL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-teal mb-2">75%</div>
                  <p className="text-muted-foreground">Reduction in document search time</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal mb-2">90%</div>
                  <p className="text-muted-foreground">Improvement in document accessibility</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal mb-2">100%</div>
                  <p className="text-muted-foreground">Digital transformation compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default About;