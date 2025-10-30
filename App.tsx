import React, { useState } from 'react';
import { ToDo } from './components/ToDo';
import { ChatBot } from './components/ChatBot';
import { ImageEditor } from './components/ImageEditor';
import { ListIcon, ChatIcon, ImageIcon } from './components/Icons';

type Tab = 'todo' | 'chat' | 'image';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('todo');

  const renderContent = () => {
    switch (activeTab) {
      case 'todo':
        return <ToDo />;
      case 'chat':
        return <ChatBot />;
      case 'image':
        return <ImageEditor />;
      default:
        return null;
    }
  };
  
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  const TabButton = ({ tabName, label, icon }: { tabName: Tab, label: string, icon: React.ReactElement }) => (
    <button
        onClick={() => setActiveTab(tabName)}
        className={`flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-300 ${
          activeTab === tabName 
            ? 'bg-gray-700 text-white shadow-inner' 
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400">
            Gemini Multi-Tool
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Your All-in-One AI Assistant & Productivity Hub</p>
        </header>

        <nav className="flex justify-center mb-8 bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm">
          <div className="flex space-x-2 bg-gray-900 p-1 rounded-md">
            <TabButton tabName="todo" label="Úkolovník" icon={<ListIcon className="w-5 h-5"/>} />
            <TabButton tabName="chat" label="Chat Bot" icon={<ChatIcon className="w-5 h-5"/>} />
            <TabButton tabName="image" label="Image Editor" icon={<ImageIcon className="w-5 h-5"/>} />
          </div>
        </nav>

        <main>
          {renderContent()}
        </main>
        
        <footer className="text-center mt-12 text-gray-500">
            <p>Powered by React, Tailwind CSS, and the Google Gemini API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
