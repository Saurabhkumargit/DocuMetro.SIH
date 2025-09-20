import { useState } from "react";
import { Clock, Upload, Search, MessageSquare, Trash2, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

interface HistoryItem {
  id: string;
  type: "upload" | "search" | "chat" | "delete";
  title: string;
  description: string;
  timestamp: string;
  details?: string;
}

const History = () => {
  const [filterType, setFilterType] = useState("all");

  // Mock history data
  const historyItems: HistoryItem[] = [
    {
      id: "1",
      type: "upload",
      title: "Document Uploaded",
      description: "Monthly Safety Report - November 2024",
      timestamp: "2024-12-01T10:30:00",
      details: "Safety section • 1.2 MB"
    },
    {
      id: "2",
      type: "chat",
      title: "Chatbot Query",
      description: "Asked about safety protocols for emergency evacuations",
      timestamp: "2024-12-01T09:15:00",
      details: "3 citations found"
    },
    {
      id: "3",
      type: "search",
      title: "Database Search",
      description: "Searched for 'maintenance schedule'",
      timestamp: "2024-11-30T16:45:00",
      details: "12 documents found"
    },
    {
      id: "4",
      type: "upload",
      title: "Document Uploaded",
      description: "Station Cleanliness Checklist",
      timestamp: "2024-11-28T14:20:00",
      details: "Operations section • 456 KB"
    },
    {
      id: "5",
      type: "delete",
      title: "Document Deleted",
      description: "Old maintenance log from 2023",
      timestamp: "2024-11-28T11:10:00",
      details: "Technical section"
    },
    {
      id: "6",
      type: "chat",
      title: "Chatbot Query",
      description: "Asked about employee leave policies",
      timestamp: "2024-11-27T13:30:00",
      details: "2 citations found"
    },
    {
      id: "7",
      type: "search",
      title: "Database Search",
      description: "Searched for 'budget reports'",
      timestamp: "2024-11-26T10:00:00",
      details: "5 documents found"
    },
    {
      id: "8",
      type: "upload",
      title: "Document Uploaded",
      description: "Equipment Maintenance Log",
      timestamp: "2024-11-25T15:45:00",
      details: "Technical section • 2.1 MB"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="h-4 w-4" />;
      case "search":
        return <Search className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "delete":
        return <Trash2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "upload":
        return "text-green-600 bg-green-100";
      case "search":
        return "text-blue-600 bg-blue-100";
      case "chat":
        return "text-teal bg-teal/10";
      case "delete":
        return "text-red-600 bg-red-100";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredItems = filterType === "all" 
    ? historyItems 
    : historyItems.filter(item => item.type === filterType);

  const activityTypes = [
    { value: "all", label: "All Activities" },
    { value: "upload", label: "Uploads" },
    { value: "search", label: "Searches" },
    { value: "chat", label: "Chatbot" },
    { value: "delete", label: "Deletions" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity History</h1>
          <p className="text-muted-foreground">
            Track your recent activities in the document management system
          </p>
        </div>

        {/* Filter */}
        <Card className="card-teal mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Activities
            </CardTitle>
            <CardDescription>
              Filter your activity history by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="input-teal w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                Showing {filteredItems.length} of {historyItems.length} activities
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className="card-teal">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Activity Icon */}
                  <div className={`p-2 rounded-full ${getActivityColor(item.type)}`}>
                    {getActivityIcon(item.type)}
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatTimestamp(item.timestamp)}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    
                    {item.details && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.details}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Timeline Connector */}
                  {index < filteredItems.length - 1 && (
                    <div className="absolute left-10 mt-12 w-0.5 h-6 bg-border"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <Card className="card-teal">
            <CardContent className="text-center py-12">
              <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No activities found</h3>
              <p className="text-muted-foreground">
                No activities match the selected filter. Try changing the filter or start using the system.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Activity Summary */}
        <Card className="card-teal mt-8">
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>
              Overview of your recent activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {historyItems.filter(item => item.type === "upload").length}
                </div>
                <div className="text-sm text-muted-foreground">Uploads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {historyItems.filter(item => item.type === "search").length}
                </div>
                <div className="text-sm text-muted-foreground">Searches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal mb-1">
                  {historyItems.filter(item => item.type === "chat").length}
                </div>
                <div className="text-sm text-muted-foreground">Chats</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {historyItems.filter(item => item.type === "delete").length}
                </div>
                <div className="text-sm text-muted-foreground">Deletions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default History;