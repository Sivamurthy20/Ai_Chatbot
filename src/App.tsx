import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Lightbulb, Code, Cpu, Globe, BookOpen, ChevronRight, Play, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'project' | 'tech' | 'resource' | 'phase';
  metadata?: any;
}

interface ProjectIdea {
  id: string;
  title: string;
  domain: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  techStack: string[];
  estimatedTime: string;
  learningOutcomes: string[];
}

interface TechRecommendation {
  category: string;
  items: Array<{
    name: string;
    description: string;
    difficulty: string;
    documentation: string;
  }>;
}

interface LearningResource {
  title: string;
  type: 'Tutorial' | 'Documentation' | 'Course' | 'Video';
  url: string;
  difficulty: string;
}

interface DevelopmentPhase {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  estimatedTime: string;
  resources: LearningResource[];
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Student Project Support Guide. I'm here to help you with project ideas, development guidance, and learning resources across IoT, AI/ML, Embedded Systems, and Web Development. What would you like to explore today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const projectIdeas: ProjectIdea[] = [
    {
      id: '1',
      title: 'Smart Home Automation System',
      domain: 'IoT',
      difficulty: 'Intermediate',
      description: 'Build a comprehensive home automation system with sensor monitoring, device control, and mobile app interface.',
      techStack: ['Arduino/ESP32', 'React Native', 'Node.js', 'MQTT', 'Firebase'],
      estimatedTime: '8-12 weeks',
      learningOutcomes: ['IoT protocols', 'Sensor integration', 'Mobile app development', 'Real-time communication']
    },
    {
      id: '2',
      title: 'Intelligent Traffic Management System',
      domain: 'AI/ML',
      difficulty: 'Advanced',
      description: 'Develop an AI-powered traffic management system using computer vision for vehicle detection and traffic optimization.',
      techStack: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'PostgreSQL'],
      estimatedTime: '12-16 weeks',
      learningOutcomes: ['Computer vision', 'Machine learning', 'Real-time processing', 'System optimization']
    },
    {
      id: '3',
      title: 'Gesture-Controlled Robot',
      domain: 'Embedded Systems',
      difficulty: 'Intermediate',
      description: 'Create a robot that responds to hand gestures using computer vision and embedded control systems.',
      techStack: ['Raspberry Pi', 'Python', 'OpenCV', 'Arduino', 'Servo Motors'],
      estimatedTime: '6-10 weeks',
      learningOutcomes: ['Embedded programming', 'Computer vision', 'Motor control', 'Real-time systems']
    },
    {
      id: '4',
      title: 'E-Learning Platform with AI Tutor',
      domain: 'Web Development',
      difficulty: 'Advanced',
      description: 'Build a comprehensive e-learning platform with an AI-powered virtual tutor for personalized learning experiences.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Python', 'NLP Libraries'],
      estimatedTime: '10-14 weeks',
      learningOutcomes: ['Full-stack development', 'AI integration', 'User experience design', 'Content management']
    }
  ];

  const developmentPhases: DevelopmentPhase[] = [
    {
      id: '1',
      title: 'Project Planning & Research',
      description: 'Define project scope, research technologies, and create detailed specifications.',
      tasks: [
        'Define project requirements and objectives',
        'Research existing solutions and technologies',
        'Create project timeline and milestones',
        'Set up development environment',
        'Design system architecture'
      ],
      estimatedTime: '1-2 weeks',
      resources: [
        { title: 'Project Planning Guide', type: 'Tutorial', url: '#', difficulty: 'Beginner' },
        { title: 'System Design Principles', type: 'Documentation', url: '#', difficulty: 'Intermediate' }
      ]
    },
    {
      id: '2',
      title: 'Prototype Development',
      description: 'Build a minimal viable prototype to validate core concepts and functionality.',
      tasks: [
        'Implement core functionality',
        'Create basic user interface',
        'Test critical components',
        'Gather initial feedback',
        'Iterate on design'
      ],
      estimatedTime: '3-4 weeks',
      resources: [
        { title: 'Rapid Prototyping Techniques', type: 'Video', url: '#', difficulty: 'Intermediate' },
        { title: 'MVP Development Guide', type: 'Course', url: '#', difficulty: 'Beginner' }
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'IoT': return 'from-blue-500 to-cyan-500';
      case 'AI/ML': return 'from-purple-500 to-pink-500';
      case 'Embedded Systems': return 'from-green-500 to-teal-500';
      case 'Web Development': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'IoT': return <Globe className="w-5 h-5" />;
      case 'AI/ML': return <Bot className="w-5 h-5" />;
      case 'Embedded Systems': return <Cpu className="w-5 h-5" />;
      case 'Web Development': return <Code className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const processUserMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    let botResponse: Message;
    const lowerText = text.toLowerCase();

    if (lowerText.includes('project') && (lowerText.includes('idea') || lowerText.includes('suggestion'))) {
      const randomProject = projectIdeas[Math.floor(Math.random() * projectIdeas.length)];
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `I'd recommend this exciting project for you:`,
        isBot: true,
        timestamp: new Date(),
        type: 'project',
        metadata: randomProject
      };
    } else if (lowerText.includes('phase') || lowerText.includes('step') || lowerText.includes('development')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `Here's a development phase to help guide your project:`,
        isBot: true,
        timestamp: new Date(),
        type: 'phase',
        metadata: developmentPhases[0]
      };
    } else if (lowerText.includes('technology') || lowerText.includes('tech') || lowerText.includes('stack')) {
      const techRecommendation: TechRecommendation = {
        category: 'Web Development',
        items: [
          { name: 'React', description: 'Modern JavaScript library for building user interfaces', difficulty: 'Intermediate', documentation: 'https://reactjs.org/docs' },
          { name: 'Node.js', description: 'JavaScript runtime for server-side development', difficulty: 'Beginner', documentation: 'https://nodejs.org/docs' },
          { name: 'MongoDB', description: 'NoSQL database for modern applications', difficulty: 'Beginner', documentation: 'https://docs.mongodb.com' }
        ]
      };
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `Here are some technology recommendations for your project:`,
        isBot: true,
        timestamp: new Date(),
        type: 'tech',
        metadata: techRecommendation
      };
    } else if (lowerText.includes('resource') || lowerText.includes('learning') || lowerText.includes('tutorial')) {
      const resources: LearningResource[] = [
        { title: 'Complete Web Development Course', type: 'Course', url: '#', difficulty: 'Beginner' },
        { title: 'React Documentation', type: 'Documentation', url: '#', difficulty: 'Intermediate' },
        { title: 'JavaScript Fundamentals', type: 'Tutorial', url: '#', difficulty: 'Beginner' }
      ];
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `Here are some excellent learning resources to help you:`,
        isBot: true,
        timestamp: new Date(),
        type: 'resource',
        metadata: resources
      };
    } else {
      // Default response with helpful suggestions
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `I can help you with various aspects of your project journey! Here are some things you can ask me about:

• **Project Ideas** - "Suggest a project idea for web development"
• **Development Phases** - "What are the development phases for my project?"
• **Technology Stack** - "What technologies should I use for an IoT project?"
• **Learning Resources** - "Can you provide learning resources for machine learning?"

What specific area would you like to explore?`,
        isBot: true,
        timestamp: new Date(),
      };
    }

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      processUserMessage(inputValue);
      setInputValue('');
    }
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'project' && message.metadata) {
      const project: ProjectIdea = message.metadata;
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.text}</p>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getDomainColor(project.domain)} text-white`}>
                  {getDomainIcon(project.domain)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.domain}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {project.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Estimated Time</h4>
                <p className="text-gray-600 text-sm">{project.estimatedTime}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Learning Outcomes</h4>
              <ul className="space-y-1">
                {project.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'phase' && message.metadata) {
      const phase: DevelopmentPhase = message.metadata;
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.text}</p>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{phase.title}</h3>
                <span className="text-sm text-gray-500">Estimated: {phase.estimatedTime}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{phase.description}</p>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Key Tasks</h4>
              <ul className="space-y-2">
                {phase.tasks.map((task, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'tech' && message.metadata) {
      const tech: TechRecommendation = message.metadata;
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.text}</p>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4">{tech.category} Technologies</h3>
            <div className="space-y-4">
              {tech.items.map((item, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'resource' && message.metadata) {
      const resources: LearningResource[] = message.metadata;
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.text}</p>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Learning Resources
            </h3>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-medium text-gray-800">{resource.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {resource.type}
                      </span>
                      <span>{resource.difficulty}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return <p className="text-gray-700 whitespace-pre-line">{message.text}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AI Project Support Guide</h1>
              <p className="text-sm text-gray-600">Your intelligent companion for student projects</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-3 max-w-4xl ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`p-2 rounded-full ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-3xl ${
                    message.isBot 
                      ? 'bg-gray-50 text-gray-800' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {renderMessage(message)}
                    <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-4 bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about project ideas, development phases, technologies, or learning resources..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Lightbulb className="w-5 h-5" />, text: 'Project Ideas', query: 'Suggest a project idea' },
            { icon: <Play className="w-5 h-5" />, text: 'Development Phases', query: 'What are the development phases?' },
            { icon: <Code className="w-5 h-5" />, text: 'Tech Stack', query: 'What technologies should I use?' },
            { icon: <BookOpen className="w-5 h-5" />, text: 'Learning Resources', query: 'Provide learning resources' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => processUserMessage(action.query)}
              className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/80 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white group-hover:scale-110 transition-transform duration-200">
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{action.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;