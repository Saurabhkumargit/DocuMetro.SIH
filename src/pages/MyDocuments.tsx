import { useState } from "react";
import { FileText, Trash2, Download, Eye, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

interface UserDocument {
  id: string;
  title: string;
  description: string;
  type: string;
  section: string;
  uploadDate: string;
  size: string;
  status: "processing" | "completed" | "failed";
}

const MyDocuments = () => {
  const { toast } = useToast();
  const userEmail = localStorage.getItem("userEmail") || "user@kmrl.gov.in";

  // Mock user documents
  const [documents, setDocuments] = useState<UserDocument[]>([
    {
      id: "1",
      title: "Monthly Safety Report - November 2024",
      description: "Safety incident analysis and preventive measures for November",
      type: "PDF",
      section: "Safety",
      uploadDate: "2024-12-01",
      size: "1.2 MB",
      status: "completed"
    },
    {
      id: "2",
      title: "Station Cleanliness Checklist",
      description: "Daily cleanliness inspection checklist for Palarivattom station",
      type: "Excel",
      section: "Operations",
      uploadDate: "2024-11-28",
      size: "456 KB",
      status: "completed"
    },
    {
      id: "3",
      title: "Equipment Maintenance Log",
      description: "Escalator and elevator maintenance records",
      type: "PDF",
      section: "Technical",
      uploadDate: "2024-11-25",
      size: "2.1 MB",
      status: "processing"
    }
  ]);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setDocuments(documents.filter(doc => doc.id !== id));
      toast({
        title: "Document deleted",
        description: "The document has been successfully removed",
      });
    }
  };

  const handleDownload = (title: string) => {
    toast({
      title: "Download started",
      description: `Downloading "${title}"...`,
    });
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-teal" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Processing</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Documents</h1>
          <p className="text-muted-foreground">
            Manage documents you've uploaded to the system
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{userEmail}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-teal">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-teal">{documents.length}</p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
                <FileText className="h-8 w-8 text-teal" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-teal">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {documents.filter(doc => doc.status === "completed").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Processed</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-teal">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {documents.filter(doc => doc.status === "processing").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Processing</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        {documents.length === 0 ? (
          <Card className="card-teal">
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No documents uploaded yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by uploading your first document to the system
              </p>
              <Button className="btn-teal" onClick={() => window.location.href = "/upload"}>
                Upload Document
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="card-teal">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* File Icon */}
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.type)}
                      </div>

                      {/* Document Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground truncate">
                            {doc.title}
                          </h3>
                          {getStatusBadge(doc.status)}
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {doc.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(doc.uploadDate)}</span>
                          </div>
                          <Badge variant="outline">{doc.section}</Badge>
                          <span>{doc.type} • {doc.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(doc.title)}
                        className="text-muted-foreground hover:text-primary"
                        disabled={doc.status !== "completed"}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(doc.title)}
                        className="text-muted-foreground hover:text-primary"
                        disabled={doc.status !== "completed"}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(doc.id, doc.title)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyDocuments;