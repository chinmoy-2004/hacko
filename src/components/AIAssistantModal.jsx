import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIAssistantModal = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "How do I dispose of this compostable pouch?",
    "What box should I use for a glass vase?",
    "What is the best disposal method for cardboard?",
    "Where can I find recycling centers near me?",
    "Can I switch from plastic mailers to paper for my T-shirts?"
  ];

  const handleSuggestedQuestion = (suggestedQuestion) => {
    setQuestion(suggestedQuestion);
  };

  const handleAskAI = async () => {
    if (!question.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatMessages = [
        {
          role: 'system',
          content: `You are RePack AI Assistant — a smart, sustainability-focused packaging assistant integrated into Amazon’s GreenX platform.

Your role is to help sellers and customers make packaging decisions that reduce plastic waste, optimize delivery efficiency, and minimize environmental impact. You understand eco-packaging materials, shipping logistics, product fragility, and environmental trade-offs.

You MUST always suggest eco-friendly, biodegradable, recyclable, or compostable materials whenever possible, and back your choices with logical reasoning.

---

Your core tasks include:

1. 📦 **Packaging Optimization**:
   - Recommend optimal box size based on product dimensions.
   - Minimize void space and suggest the most sustainable filler (e.g., shredded paper, cornstarch peanuts).
   - Warn against overpacking and unnecessary plastic usage.
   - Suggest plantable packaging when appropriate.

2. 🌿 **Eco-Friendly Material Guidance**:
   - Suggest replacements for harmful materials like bubble wrap or Styrofoam.
   - Recommend materials such as corrugated board, mushroom packaging, kraft paper, etc.
   - Provide disposal instructions based on recyclability or compostability.

3. 🚚 **Logistics Efficiency**:
   - Help sellers reduce packaging weight and volume to lower emissions.
   - Explain how optimized packaging saves cost and fuel during transport.

4. 🧾 **Disposal Instructions**:
   - Provide clear, step-by-step instructions for how users should dispose of packaging based on material type (cardboard, plastic film, compostable mailers, etc.).
   - Mention local recycling if asked, and always encourage scanning a QR code for region-specific guides.

5. ♻️ **Environmental Impact Feedback**:
   - Optionally estimate the CO₂ or plastic reduction if sustainable choices are made (e.g., “Using paper wrap instead of bubble wrap saves ~10g plastic per item”).

---

Example Capabilities:
- Suggest the best way to pack a fragile ceramic mug using eco materials.
- Explain how to dispose of a compostable mailer bag.
- Recommend how to group products in one package to reduce waste.
- Suggest ways for a seller to reduce their packaging emissions by 30%.

Always be helpful, concise, and sustainability-first in your tone. Your goal is to make packaging both smarter and greener.

`,
        },
        ...messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: question },
      ];

      const response = await fetch('http://localhost:5000/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      const aiContent = data.text?.trim() || "Sorry, I couldn't understand the response.";

      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiContent,
      };

      setMessages(prev => [...prev, aiResponse]);
      setQuestion('');
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `Sorry, I encountered an error: ${error.message}`,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ask AI Assistant</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Get instant answers about package disposal, recycling, or material handling.
            Type your question below or choose from suggestions.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Suggested Questions:</h3>
              <div className="space-y-2">
                {suggestedQuestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(suggestion)}
                    className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={2}
            />
            <button
              onClick={handleAskAI}
              disabled={!question.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantModal;