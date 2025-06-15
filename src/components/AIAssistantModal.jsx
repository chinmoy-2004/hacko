import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIAssistantModal = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "How do I dispose of this package?",
    "Can this material be recycled?",
    "What is the best disposal method for cardboard?",
    "Where can I find recycling centers near me?",
    "Is this package compostable?"
  ];

  const handleSuggestedQuestion = (suggestedQuestion) => {
    setQuestion(suggestedQuestion);
  };

  const handleAskAI = async () => {
    if (!question.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(question)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setQuestion('');
    }, 1500);
  };

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('dispose') || lowerQuestion.includes('disposal')) {
      return "For proper disposal, first identify the material type. Cardboard should be flattened and placed in recycling bins. Plastic containers need to be cleaned and sorted by recycling number. Always check local guidelines as they may vary by location.";
    }
    
    if (lowerQuestion.includes('recycle') || lowerQuestion.includes('recycling')) {
      return "Most packaging materials are recyclable! Cardboard, paper, and many plastics can go in your curbside recycling. Remove any tape, labels, or food residue first. Glass and aluminum are also highly recyclable. Check the recycling symbols on packages for specific guidance.";
    }
    
    if (lowerQuestion.includes('cardboard')) {
      return "Cardboard is one of the most recyclable materials! Remove any tape, staples, or plastic labels. Flatten the boxes to save space. Place in your recycling bin or take to a recycling center. Wet or greasy cardboard should go in regular trash.";
    }
    
    if (lowerQuestion.includes('center') || lowerQuestion.includes('near me')) {
      return "To find recycling centers near you, try: 1) Check your city's website for local facilities, 2) Use Earth911.com's recycling locator, 3) Contact your waste management company, 4) Check with local grocery stores - many accept certain materials like plastic bags.";
    }
    
    return "That's a great question! For the most accurate disposal guidance, I'd recommend checking your local waste management guidelines, as recycling rules can vary by location. You can also look for recycling symbols on the package or contact your local environmental services.";
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
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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