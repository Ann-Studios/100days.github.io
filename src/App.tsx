import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlogList from './pages/BlogList';
import ChallengeList from './pages/ChallengeList';
import NewBlogPost from './pages/NewBlogPost';
import NewChallenge from './pages/NewChallenge';
import ChallengeDetail from './pages/ChallengeDetail';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/new" element={<NewBlogPost />} />
            <Route path="challenges" element={<ChallengeList />} />
            <Route path="challenges/new" element={<NewChallenge />} />
            <Route path="challenges/:id" element={<ChallengeDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;