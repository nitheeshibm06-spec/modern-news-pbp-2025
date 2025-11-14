import { useState, useMemo } from 'react';
import { Search, ExternalLink, Globe } from 'lucide-react';

interface NewsChannel {
  id: number;
  name: string;
  url: string;
  category: string;
  description: string;
}

const newsChannels: NewsChannel[] = [
  { id: 1, name: 'CNN', url: 'https://www.cnn.com', category: 'Global', description: 'Breaking news and analysis' },
  { id: 2, name: 'BBC News', url: 'https://www.bbc.com/news', category: 'Global', description: 'World news coverage' },
  { id: 3, name: 'Reuters', url: 'https://www.reuters.com', category: 'Global', description: 'International news agency' },
  { id: 4, name: 'Al Jazeera', url: 'https://www.aljazeera.com', category: 'Global', description: 'Middle East perspectives' },
  { id: 5, name: 'The Guardian', url: 'https://www.theguardian.com', category: 'Global', description: 'Independent journalism' },
  { id: 6, name: 'Fox News', url: 'https://www.foxnews.com', category: 'US', description: 'American news network' },
  { id: 7, name: 'NBC News', url: 'https://www.nbcnews.com', category: 'US', description: 'Breaking US news' },
  { id: 8, name: 'ABC News', url: 'https://abcnews.go.com', category: 'US', description: 'National and world news' },
  { id: 9, name: 'CBS News', url: 'https://www.cbsnews.com', category: 'US', description: 'American news reporting' },
  { id: 10, name: 'NPR', url: 'https://www.npr.org', category: 'US', description: 'Public radio journalism' },
  { id: 11, name: 'Sky News', url: 'https://news.sky.com', category: 'UK', description: 'British news channel' },
  { id: 12, name: 'Financial Times', url: 'https://www.ft.com', category: 'Business', description: 'Global business news' },
  { id: 13, name: 'Bloomberg', url: 'https://www.bloomberg.com', category: 'Business', description: 'Financial markets coverage' },
  { id: 14, name: 'CNBC', url: 'https://www.cnbc.com', category: 'Business', description: 'Business news network' },
  { id: 15, name: 'Associated Press', url: 'https://apnews.com', category: 'Global', description: 'Independent news organization' },
  { id: 16, name: 'France 24', url: 'https://www.france24.com', category: 'Global', description: 'International news' },
  { id: 17, name: 'DW News', url: 'https://www.dw.com', category: 'Global', description: 'German international broadcaster' },
  { id: 18, name: 'NHK World', url: 'https://www3.nhk.or.jp/nhkworld/', category: 'Global', description: 'Japan broadcasting' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(newsChannels.map(c => c.category)))];

  const filteredChannels = useMemo(() => {
    return newsChannels.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          channel.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-6 shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            News Directory
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your gateway to trusted news sources from around the world
          </p>
        </header>

        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-400"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredChannels.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No channels found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChannels.map((channel, index) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 hover:border-slate-300"
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 0.05}s both`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-slate-700 transition-colors">
                      {channel.name}
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                      {channel.category}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {channel.description}
                </p>
              </a>
            ))}
          </div>
        )}

        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p>Providing quick access to trusted news sources worldwide</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
