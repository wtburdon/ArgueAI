import React, { useState } from 'react';

// --- SVG Icon Components ---
// Using inline SVGs is a best practice for single-file components
// as it avoids external dependencies and simplifies the build process.

const BrainCircuitIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5V3" /><path d="M12 13v-3" /><path d="M12 21v-3" /><path d="M19 12h2" /><path d="M5 12H3" /><path d="M17 17l-1-1" /><path d="M8 8l-1-1" /><path d="M17 7l-1 1" /><path d="M8 16l-1 1" /><path d="M9 13a3 3 0 1 0 0-6" /><path d="M15 13a3 3 0 1 0 0-6" /><path d="M9 10h6" />
  </svg>
);

const ShieldCheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
  </svg>
);

const BookOpenIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const FeatherIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
);


// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-gray-900 text-white font-sans antialiased">
      {/* Header */}
      <header className="py-5 px-4 sm:px-6 lg:px-8 border-b border-gray-800 backdrop-blur-sm bg-gray-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">ArgueAi</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a>
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative text-center py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-grid-gray-800/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-blue-900/40 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                    Master the Art of Persuasion with AI
                </h2>
                <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-300">
                    Your AI-powered partner for constructing logical, compelling, and evidence-backed arguments on any topic. Win every debate, from the boardroom to the classroom.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="#" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                        Try For Free
                    </a>
                    <a href="#" className="w-full sm:w-auto bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                        Watch Demo
                    </a>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Why ArgueAi?</h3>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Everything You Need to Win
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Leverage cutting-edge AI to build arguments that are not just persuasive, but irrefutable.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature Card 1 */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                <div className="bg-blue-900/50 text-blue-300 w-12 h-12 rounded-lg flex items-center justify-center">
                  <BrainCircuitIcon className="w-6 h-6" />
                </div>
                <h4 className="mt-5 text-xl font-semibold text-white">Logical Structuring</h4>
                <p className="mt-2 text-gray-400">Our AI organizes your points into a coherent, powerful narrative that flows logically from premise to conclusion.</p>
              </div>
              {/* Feature Card 2 */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                <div className="bg-teal-900/50 text-teal-300 w-12 h-12 rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6" />
                </div>
                <h4 className="mt-5 text-xl font-semibold text-white">Evidence Generation</h4>
                <p className="mt-2 text-gray-400">Instantly find and cite relevant data, statistics, and sources to add credibility and authority to your arguments.</p>
              </div>
              {/* Feature Card 3 */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                <div className="bg-indigo-900/50 text-indigo-300 w-12 h-12 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6" />
                </div>
                <h4 className="mt-5 text-xl font-semibold text-white">Counter-Argument Analysis</h4>
                <p className="mt-2 text-gray-400">Anticipate and neutralize opposing viewpoints by understanding potential weaknesses in your own case.</p>
              </div>
              {/* Feature Card 4 */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                <div className="bg-purple-900/50 text-purple-300 w-12 h-12 rounded-lg flex items-center justify-center">
                  <FeatherIcon className="w-6 h-6" />
                </div>
                <h4 className="mt-5 text-xl font-semibold text-white">Tone & Style Adaptation</h4>
                <p className="mt-2 text-gray-400">Adapt your argument's tone—from academic and formal to passionate and persuasive—for any audience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black/20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Simple & Intuitive</h3>
                    <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                        Get Your Perfect Argument in 3 Steps
                    </p>
                </div>
                <div className="mt-16 space-y-12">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400">1</div>
                        <div className="flex-grow text-center md:text-left">
                            <h4 className="text-xl font-semibold text-white">Enter Your Thesis</h4>
                            <p className="mt-2 text-gray-400">Start by providing your core idea, thesis statement, or the topic you need to argue for. Be as specific or as broad as you like.</p>
                        </div>
                    </div>
                     {/* Step 2 */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400">2</div>
                        <div className="flex-grow text-center md:text-left">
                            <h4 className="text-xl font-semibold text-white">Let AI Generate & Analyze</h4>
                            <p className="mt-2 text-gray-400">ArgueAi processes your input, generating key talking points, finding evidence, and analyzing potential counter-arguments in seconds.</p>
                        </div>
                    </div>
                     {/* Step 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400">3</div>
                        <div className="flex-grow text-center md:text-left">
                            <h4 className="text-xl font-semibold text-white">Refine & Export</h4>
                            <p className="mt-2 text-gray-400">Review the AI-generated structure, customize it to your liking, and export your complete, well-reasoned argument for any use case.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
              <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">GitHub</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg></a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">&copy; 2025 ArgueAi, Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
