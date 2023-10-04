import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FiniteStateMachine from '@elitk/finite-state-machine';

import HomePage from './components/HomePage/HomePage';
import VotingPage from './components/VotingPage/VotingPage';
import ConfirmationPage from './components/ConfirmationPage/ConfirmationPage';
import { StateProvider } from './context/StateContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  ELECTION_STATES,
  ELECTION_TRANSITIONS,
} from './utils/electionConstants';

const finiteStateMachine = new FiniteStateMachine(
  ELECTION_STATES.NOT_LOGGED_IN,
  ELECTION_TRANSITIONS
);

function App() {
  return (
    <StateProvider finiteStateMachine={finiteStateMachine}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;
