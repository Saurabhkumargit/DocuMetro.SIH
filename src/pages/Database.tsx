import { useState } from "react";
import { Search, Filter, FileText, Download, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

interface Document {
  id: string;
  title: string;
  description: string;
  type: string;
  section: string;
  uploadDate: string;
  size: string;
  author: string;
  tags: string[];
}

const Database = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Mock documents data
  const documents: Document[] = [
    {
      id: "1",
      title: "KMRL Safety Guidelines 2024",
      description: "Comprehensive safety protocols for all metro operations",
      type: "PDF",
      section: "Safety",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      author: "Safety Department",
      tags: ["safety", "protocols", "guidelines"]
    },
    {
      id: "2",
      title: "Station Maintenance Manual",
      description: "Daily and periodic maintenance procedures for metro stations",
      type: "PDF",
      section: "Technical",
      uploadDate: "2024-01-10",
      size: "5.1 MB",
      author: "Technical Team",
      tags: ["maintenance", "stations", "technical"]
    },
    {
      id: "3",
      title: "Employee Handbook 2024",
      description: "HR policies, leave guidelines, and employee benefits",
      type: "PDF",
      section: "HR",
      uploadDate: "2024-01-08",
      size: "1.8 MB",
      author: "Human Resources",
      tags: ["hr", "policies", "employees"]
    },
    {
      id: "4",
      title: "Budget Report Q4 2023",
      description: "Quarterly financial report and budget analysis",
      type: "Excel",
      section: "Finance",
      uploadDate: "2024-01-05",
      size: "892 KB",
      author: "Finance Department",
      tags: ["budget", "finance", "quarterly"]
    },
    {
      id: "5",
      title: "Emergency Response Procedures",
      description: "Step-by-step emergency response protocols",
      type: "PDF",
      section: "Safety",
      uploadDate: "2024-01-03",
      size: "3.2 MB",
      author: "Emergency Response Team",
      tags: ["emergency", "response", "safety"]
    },
    {
      id: "6",
      title: "Network Expansion Plan 2024-2026",
      description: "Future metro line extensions and infrastructure development",
      type: "PowerPoint",
      section: "Planning",
      uploadDate: "2023-12-28",
      size: "15.6 MB",
      author: "Planning Department",
      tags: ["expansion", "planning", "infrastructure"]
    }
  ];

  const sections = ["Safety", "Technical", "HR", "Finance", "Planning", "Operations"];
  const fileTypes = ["PDF", "Excel", "PowerPoint", "Word", "Image"];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSection = selectedSection === "all" || doc.section === selectedSection;
    const matchesType = selectedType === "all" || doc.type === selectedType;
    
    return matchesSearch && matchesSection && matchesType;
  });

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-teal" />;
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
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Document Database</h1>
          <p className="text-muted-foreground">
            Browse and search through all KMRL documents
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card-teal mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter
            </CardTitle>
            <CardDescription>
              Find documents quickly using search and filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="md:col-span-1">
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-teal"
                />
              </div>

              {/* Section Filter */}
              <div>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="input-teal">
                    <SelectValue placeholder="All Sections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    {sections.map(section => (
                      <SelectItem key={section} value={section}>{section}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* File Type Filter */}
              <div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="input-teal">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {fileTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredDocuments.length} of {documents.length} documents
          </p>
          <Button variant="outline" className="btn-teal-outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="card-teal group hover:scale-[1.02] transition-transform duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <CardTitle className="text-lg leading-tight">{doc.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {doc.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Metadata */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(doc.uploadDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{doc.section}</Badge>
                    <span>by {doc.author}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button className="btn-teal flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="btn-teal-outline">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query or filters
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Database;