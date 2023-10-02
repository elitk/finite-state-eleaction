import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useFiniteStateMachine from '../../hooks/useFiniteStateMachine';
import MainTitle from '../UI/MainTitle/MainTitle';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

import mockData from '../../utils/mockData.json';
import {
  ELECTION_STATES,
  ELECTION_TRANSITIONS,
} from '../../utils/electionConstants'; 
import { setLocalStorageItem } from '../../utils/localStorage';

import './VotingPage.css'; 

const candidates = mockData.candidates;

function VotingPage() {
  const [state, dispatch] = useFiniteStateMachine(
    ELECTION_STATES.LOGGED_IN,
    ELECTION_TRANSITIONS
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name } = location.state.user;
  const city = location.state.city;
  const [selectedCandidate, setSelectedCandidate] = useState(
    candidates[city][0].name
  );
  const [hasVoted, setHasVoted] = useState(false); 
  const [showModal, setShowModal] = useState(false);

  const handleVote = () => {
    if (!selectedCandidate) {
      alert('Please select candidate');
      return;
    }
    setShowModal(true);
  };
  const handleConfirmVote = () => {
    setLocalStorageItem(id, selectedCandidate);
    setShowModal(false);
    setHasVoted(true);
    dispatch('VOTE');
    setTimeout(() => {
      navigate('/confirm');
    }, 2000);
  };

  const footerContent = (
    <>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
      <Button onClick={() => handleConfirmVote()}>Confirm Vote</Button>
    </>
  );
  return (
    <div className="vote-container">
      <MainTitle text={` Hello ${name} welcome to the election of ${city}`} />
      <h3>Please select your candidate</h3>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        {candidates[city].map((candidate) => (
          <option key={candidate.id} value={candidate.name}>
            {candidate.name}
          </option>
        ))}
      </select>

      <Button onClick={() => handleVote()}>Vote</Button>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Vote"
        footerContent={footerContent}
      >
        <p>You voted for: {selectedCandidate}</p>
      </Modal>

      <div className="ballot-box">
        <div className="envelope-slot"></div>
        {hasVoted && <div className="envelope"></div>}{' '}
      </div>
    </div>
  );
}

export default VotingPage;
