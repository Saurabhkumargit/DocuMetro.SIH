import { useNavigate } from "react-router-dom";
import { User, LogOut, FileText, Settings, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get user data from localStorage
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "user@kmrl.gov.in";
  const userDesignation = localStorage.getItem("userDesignation") || "Officer";
  const userStation = localStorage.getItem("userStation") || "MG Road";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userDesignation");
    localStorage.removeItem("userStation");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const profileOptions = [
    {
      title: "My Documents",
      description: "View and manage your uploaded documents",
      icon: FileText,
      action: () => navigate("/my-documents"),
      color: "text-teal",
    },
    {
      title: "Settings",
      description: "Update your account preferences and settings",
      icon: Settings,
      action: () => toast({ title: "Settings", description: "Settings page coming soon!" }),
      color: "text-muted-foreground",
    },
    {
      title: "Logout",
      description: "Sign out of your KMRL account",
      icon: LogOut,
      action: handleLogout,
      color: "text-destructive",
      variant: "destructive" as const,
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Information Card */}
          <div className="lg:col-span-1">
            <Card className="card-teal">
              <CardHeader className="text-center pb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{userName}</CardTitle>
                <CardDescription className="text-base">{userEmail}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Briefcase className="h-5 w-5 text-teal" />
                  <div>
                    <p className="font-medium text-foreground">{userDesignation}</p>
                    <p className="text-sm text-muted-foreground">Designation</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <MapPin className="h-5 w-5 text-teal" />
                  <div>
                    <p className="font-medium text-foreground">{userStation} Station</p>
                    <p className="text-sm text-muted-foreground">Primary Station</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <User className="h-5 w-5 text-teal" />
                  <div>
                    <p className="font-medium text-foreground">KMRL Employee</p>
                    <p className="text-sm text-muted-foreground">Account Type</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Options */}
          <div className="lg:col-span-2">
            <Card className="card-teal">
              <CardHeader>
                <CardTitle>Account Options</CardTitle>
                <CardDescription>
                  Manage your account settings and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                    onClick={option.action}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-accent group-hover:bg-background transition-colors`}>
                        <option.icon className={`h-5 w-5 ${option.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                    <Button
                      variant={option.variant || "ghost"}
                      size="sm"
                      className={option.variant === "destructive" ? "" : "text-muted-foreground hover:text-primary"}
                    >
                      {option.title === "Logout" ? "Sign Out" : "Open"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-teal mt-6">
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
                <CardDescription>
                  Overview of your document management activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Documents Uploaded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal mb-1">12</div>
                    <div className="text-sm text-muted-foreground">Chatbot Queries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal mb-1">8</div>
                    <div className="text-sm text-muted-foreground">Database Searches</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;