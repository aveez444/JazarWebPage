import React, { useState } from 'react';
import axios from 'axios';

const FAQPage = () => {
  const [faqData, setFaqData] = useState([
    {
      question: 'What services does your IT company offer?',
      answer: 'We offer a range of IT services including software development, IT consulting, cloud solutions, and system integration.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support through our website contact form or email us at support@example.com.'
    },
    {
      question: 'Do you offer cloud services?',
      answer: 'Yes, we provide cloud services including cloud storage, cloud computing, and cloud management solutions.'
    },
    {
      question: 'What is your pricing model?',
      answer: 'Our pricing model is flexible. We offer both fixed pricing and hourly rates based on the project requirements.'
    }
  ]);

  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [story, setStory] = useState('');

  // Handle input change for chatbot prompt
  const handleInputChange = (e) => {
    setUserPrompt(e.target.value);
  };

  // Handle chatbot submit action
  const handleChatSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/gen/', { prompt: userPrompt });
      setStory(response.data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      setStory('Sorry, there was an issue generating the story. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <button
                onClick={() => {
                  document.getElementById(`faq-${index}`).classList.toggle('hidden');
                }}
                className="w-full text-left font-semibold text-lg text-gray-700 hover:text-blue-500 focus:outline-none"
              >
                {faq.question}
              </button>
              <div id={`faq-${index}`} className="hidden mt-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Floating Icon */}
      <div
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full cursor-pointer shadow-lg"
        onClick={() => setChatBotOpen(!chatBotOpen)}
      >
        <i className="fas fa-comments text-2xl"></i>
      </div>

      {/* Chatbot Modal */}
      {chatBotOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-80">
            <h3 className="text-xl font-semibold mb-4 text-center">Chatbot</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              rows="4"
              placeholder="Ask me anything..."
              value={userPrompt}
              onChange={handleInputChange}
            ></textarea>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-md"
                onClick={handleChatSubmit}
              >
                Send
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md"
                onClick={() => setChatBotOpen(false)}
              >
                Close
              </button>
            </div>

            {/* Story Output */}
            {story && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Generated Story:</h4>
                <p>{story}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQPage;
