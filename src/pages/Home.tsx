import { useNavigate } from "react-router-dom";
import { Upload, FileText, BarChart3, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import heroImage from "@/assets/kmrl-hero.jpg";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userName = localStorage.getItem("userName") || "User";

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const actionCards = [
    {
      title: "Upload Document",
      description: "Add new documents to the system with detailed metadata",
      icon: Upload,
      action: () => navigate("/upload"),
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "My Documents",
      description: "View and manage your uploaded documents",
      icon: FileText,
      action: () => navigate("/my-documents"),
      color: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    },
    {
      title: "Dashboard",
      description: "View system analytics and document statistics",
      icon: BarChart3,
      action: () => navigate("/database"),
      color: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    },
    {
      title: "Ask Chatbot",
      description: "Get instant answers from the document database",
      icon: MessageSquare,
      action: () => navigate("/chatbot"),
      color: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome back,{" "}
                <span className="text-teal">{userName}</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                Manage your documents efficiently with KMRL's intelligent document 
                management system. Upload, search, and retrieve documents with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button onClick={() => navigate("/upload")} className="btn-teal">
                  <Plus className="mr-2 h-5 w-5" />
                  Upload Document
                </Button>
                <Button onClick={() => navigate("/chatbot")} className="btn-teal-outline">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Ask Chatbot
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="KMRL Metro System"
                className="rounded-2xl shadow-teal w-full h-auto"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Quick Actions
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Choose an action to get started with document management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionCards.map((card, index) => (
              <Card key={index} className="card-teal group cursor-pointer h-full" onClick={card.action}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${card.color}`}>
                    <card.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-teal mb-2">
                1,234
              </div>
              <div className="text-lg text-muted-foreground">
                Total Documents
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-teal mb-2">
                45
              </div>
              <div className="text-lg text-muted-foreground">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-teal mb-2">
                98%
              </div>
              <div className="text-lg text-muted-foreground">
                System Uptime
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;