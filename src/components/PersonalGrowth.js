import { useState } from 'react';

export default function PersonalGrowth({ user, onBack }) {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    {
      text: "How can I improve my organization skills?",
      category: "Productivity",
      icon: "📋"
    },
    {
      text: "How can I be a better friend?",
      category: "Relationships", 
      icon: "🤝"
    },
    {
      text: "How can I feel more fulfilled?",
      category: "Purpose",
      icon: "✨"
    },
    {
      text: "How can I build more confidence?",
      category: "Self-Development",
      icon: "💪"
    },
    {
      text: "How can I manage stress better?",
      category: "Wellness",
      icon: "🧘"
    },
    {
      text: "How can I find my passion?",
      category: "Purpose",
      icon: "🔥"
    }
  ];

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setCustomQuestion('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionToAnswer = selectedQuestion || customQuestion;
    
    if (!questionToAnswer.trim()) return;

    setIsLoading(true);
    
    try {
      // Here you would integrate with your Gemini API for personalized guidance
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResponse(`Based on your cosmic profile and birth chart, here's personalized guidance for "${questionToAnswer}":\n\nYour natural strengths align with this area of growth. The stars suggest focusing on small, consistent changes that honor your authentic self. Trust your intuition and allow the universe to guide your journey of personal transformation.`);
    } catch (error) {
      console.error('Error getting guidance:', error);
      setResponse('Unable to generate guidance at this time. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedQuestion('');
    setCustomQuestion('');
    setResponse('');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Personal growth</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {!response ? (
          <>
            {/* Question Prompt */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🌱</div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  What do you want to work on?
                </h2>
                <p className="text-gray-400 text-sm">
                  Choose a question or ask your own for personalized cosmic guidance
                </p>
              </div>
            </div>

            {/* Suggested Questions */}
            <div className="space-y-3 mb-6">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionSelect(question.text)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    selectedQuestion === question.text
                      ? 'bg-purple-900 border-purple-600 text-white'
                      : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{question.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-base">{question.text}</div>
                      <div className="text-sm text-gray-500">{question.category}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Question Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => {
                    setCustomQuestion(e.target.value);
                    setSelectedQuestion('');
                  }}
                  placeholder="Ask me anything..."
                  className="w-full bg-gray-900 text-white rounded-full px-4 py-3 border border-gray-700 focus:border-purple-600 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || (!selectedQuestion && !customQuestion.trim())}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>

              {selectedQuestion && (
                <div className="bg-purple-900/30 border border-purple-600/30 rounded-2xl p-4">
                  <div className="text-sm text-purple-300 mb-1">Selected question:</div>
                  <div className="text-white font-medium">{selectedQuestion}</div>
                </div>
              )}
            </form>

            {/* Suggested Quick Actions */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm mb-3">Popular right now:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Self-confidence', 'Stress management', 'Finding purpose'].map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionSelect(`How can I improve my ${topic.toLowerCase()}?`)}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Response Display */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Your Cosmic Guidance
                </h2>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 rounded-2xl p-6 border border-purple-600/30 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="text-purple-300 text-sm font-medium">
                    Question: {selectedQuestion || customQuestion}
                  </div>
                  <div className="text-white leading-relaxed whitespace-pre-line">
                    {response}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleReset}
                  className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Ask Another Question
                </button>
                <button
                  onClick={onBack}
                  className="w-full bg-gray-800 text-white font-medium py-3 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>

              {/* Share Option */}
              <div className="text-center">
                <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                  Save this guidance
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 text-center border border-gray-700">
            <div className="text-4xl mb-4">🔮</div>
            <div className="text-white font-semibold mb-2">Consulting the cosmos...</div>
            <div className="text-gray-400 text-sm mb-4">Generating personalized guidance</div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}