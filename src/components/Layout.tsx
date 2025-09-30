import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, Target, Home, Plus, Moon, Sun } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or saved preference
    const isDark = localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <nav className="nav-github sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-xl font-bold text-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                100Days
              </Link>

              <div className="hidden md:flex space-x-6">
                <Link
                  to="/blog"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isActive('/blog')
                      ? 'text-[var(--accent)] bg-[var(--primary)]'
                      : 'text-[var(--text)] hover:bg-[var(--primary)]'
                    }`}
                >
                  <BookOpen size={18} />
                  <span>Blog</span>
                </Link>

                <Link
                  to="/challenges"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isActive('/challenges')
                      ? 'text-[var(--accent)] bg-[var(--primary)]'
                      : 'text-[var(--text)] hover:bg-[var(--primary)]'
                    }`}
                >
                  <Target size={18} />
                  <span>Challenges</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-[var(--primary)] transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link
                to="/blog/new"
                className="btn-github-primary px-4 py-2 rounded-lg hidden sm:flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>New Post</span>
              </Link>

              <Link
                to="/challenges/new"
                className="btn-github-success px-4 py-2 rounded-lg hidden sm:flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>New Challenge</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 nav-github border-t border-[var(--secondary)] px-4 py-2">
        <div className="flex justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${isActive('/')
                ? 'text-[var(--accent)]'
                : 'text-[var(--text)]'
              }`}
          >
            <Home size={20} />
            <span className="text-xs">Dashboard</span>
          </Link>

          <Link
            to="/blog"
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${isActive('/blog')
                ? 'text-[var(--accent)]'
                : 'text-[var(--text)]'
              }`}
          >
            <BookOpen size={20} />
            <span className="text-xs">Blog</span>
          </Link>

          <Link
            to="/challenges"
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${isActive('/challenges')
                ? 'text-[var(--accent)]'
                : 'text-[var(--text)]'
              }`}
          >
            <Target size={20} />
            <span className="text-xs">Challenges</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;