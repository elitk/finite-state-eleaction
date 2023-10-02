import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import VotingPage from './components/VotingPage/VotingPage';
import ConfirmationPage from './components/ConfirmationPage/ConfirmationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/confirm" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
