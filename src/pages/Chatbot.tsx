import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  citations?: string[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your KMRL document assistant. I can help you find information from uploaded documents, search the database, and answer questions about KMRL policies and procedures. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      citations: []
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock responses for demo purposes
  const mockResponses = [
    {
      text: "Based on the uploaded documents, KMRL follows a structured document classification system. Documents are categorized by department, urgency level, and access permissions.",
      citations: ["KMRL_Policy_Document_2024.pdf", "Admin_Guidelines_v2.1.pdf"]
    },
    {
      text: "The station maintenance protocols require daily inspections as per the technical manual. Each station must maintain logs for safety equipment, cleanliness, and passenger flow monitoring.",
      citations: ["Station_Maintenance_Manual.pdf", "Safety_Protocols_2024.pdf"]
    },
    {
      text: "Employee leave policies are outlined in the HR handbook. Regular employees are entitled to 21 days of annual leave, sick leave provisions, and emergency leave as per Kerala government guidelines.",
      citations: ["HR_Handbook_2024.pdf", "Leave_Policy_Updated.pdf"]
    }
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse.text,
        sender: "bot",
        timestamp: new Date(),
        citations: randomResponse.citations,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bot className="h-8 w-8 text-teal" />
            KMRL Document Assistant
          </h1>
          <p className="text-muted-foreground mt-2">
            Ask questions about your documents and get instant answers with citations
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-3 max-w-3xl ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-accent-foreground"
                }`}>
                  {message.sender === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>

                {/* Message Content */}
                <Card className={`${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"} shadow-sm`}>
                  <CardContent className="p-4">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    
                    {/* Citations */}
                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/20">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Sources:</p>
                        <div className="space-y-1">
                          {message.citations.map((citation, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              <span>{citation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <Card className="bg-card shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about documents, policies, procedures..."
            className="input-teal flex-1"
            disabled={isTyping}
          />
          <Button type="submit" className="btn-teal" disabled={isTyping || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Chatbot;