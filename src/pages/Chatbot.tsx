import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, FileText, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  citations?: string[];
}

const Chatbot = () => {
  const { t } = useLanguage();
  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t('chatbot.welcome'),
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

  // Handle voice transcript
  useEffect(() => {
    if (transcript) {
      setNewMessage(transcript);
      // Auto-submit the voice input
      setTimeout(() => {
        handleSendMessage(new Event('submit') as any);
        resetTranscript();
      }, 500);
    }
  }, [transcript]);

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
            {t('chatbot.title')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('chatbot.subtitle')}
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
                        <p className="text-xs font-medium text-muted-foreground mb-2">{t('chatbot.sources')}</p>
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
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isListening ? t('chatbot.voice.listening') : t('chatbot.placeholder')}
              className="input-teal pr-12"
              disabled={isTyping || isListening}
            />
            
            {/* Voice Input Button */}
            {isSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={isListening ? stopListening : startListening}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-primary hover:bg-accent"
                disabled={isTyping}
                title={isListening ? t('chatbot.voice.stop') : t('chatbot.voice.start')}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            )}
          </div>
          
          <Button type="submit" className="btn-teal" disabled={isTyping || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Chatbot;