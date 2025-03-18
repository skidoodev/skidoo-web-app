import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";

interface ItineraryResultProps {
  itinerary: string;
  destination: string;
  duration: string;
}

interface Message {
  content: string;
  isUser: boolean;
}

export default function ItineraryResult({ itinerary, destination, duration }: ItineraryResultProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      content: "How can I help you modify this itinerary? For example, you can ask me to \"add more family-friendly activities\" or \"suggest cheaper dining options\".", 
      isUser: false 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState(itinerary);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { content: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to API
      const response = await fetch('/api/chat-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          currentItinerary: currentItinerary,
          destination,
          duration
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add AI response to chat
      setMessages(prev => [...prev, { content: data.message, isUser: false }]);
      
      // Update itinerary if it was modified
      if (data.updatedItinerary) {
        setCurrentItinerary(data.updatedItinerary);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        content: "Sorry, I couldn't process your request. Please try again.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
      <div className="bg-gradient-to-r from-[#2472FC] to-[#8711C1] px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Your {duration}-Day Itinerary for {destination}
        </h2>
      </div>
      <div className="p-6">
        <div className="prose max-w-none">
          <ReactMarkdown>{currentItinerary}</ReactMarkdown>
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="border-t border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Need adjustments? Chat with our AI assistant</h3>
        
        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                message.isUser 
                  ? 'bg-[#2472FC] text-white ml-auto' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500 mb-3 p-3 rounded-lg bg-gray-200 max-w-[80%]">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputMessage.trim()}
            className="bg-[#2472FC] hover:bg-[#1c5fd0]"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}