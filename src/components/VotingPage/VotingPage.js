import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import MainTitle from '../UI/MainTitle/MainTitle';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

import mockData from '../../utils/mockData.json';
import { useStateContext } from '../../context/StateContext';
import { setLocalStorageItem } from '../../utils/localStorage';
import { ELECTION_ACTIONS } from '../../utils/electionConstants';

import './VotingPage.css';
import withAuth from '../AuthComponent';

const candidates = mockData.candidates;
const cities = mockData.cities;

function VotingPage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const { finiteStateMachine } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { id, name, cityId } = location.state.citizen;

  const city = cities.find(({ id }) => id === cityId);
  const cityCandidates = candidates.filter(
    (candidate) => candidate.cityId === cityId
  );

  const handleVote = () => {
    if (!selectedCandidate) {
      toast.error(`Please select candidate`, {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    setShowModal(true);
  };

  const handleConfirmVote = () => {
    // simulatation to db save
    setLocalStorageItem(id, selectedCandidate);
    closeModal();
    setHasVoted(true);
    finiteStateMachine.transition(ELECTION_ACTIONS.VOTE);
    setTimeout(() => {
      navigate('/confirm');
    }, 2000);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="vote-container">
      <MainTitle
        text={`Hello ${name} welcome to the election of ${city.name}`}
      />
      <h3>Please select your candidate</h3>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        <option>please select</option>
        {cityCandidates.map((candidate) => (
          <option key={candidate.id} value={candidate.name}>
            {candidate.name}
          </option>
        ))}
      </select>
      <Button
        className={hasVoted ? 'error' : ''}
        disabled={hasVoted}
        onClick={() => handleVote()}
      >
        Vote
      </Button>

      <Modal
        show={showModal}
        title="Confirm Vote"
        primaryActionLabel="Confirm"
        primaryActionClassName="success"
        secendoryActionLabel="Cancel"
        secendoryActionClassName="error"
        onPrimaryActionClick={handleConfirmVote}
        onSeconderyActionClick={closeModal}
        onClose={closeModal}
      >
        <p>You voted for: {selectedCandidate}</p>
      </Modal>
      <div className="ballot-box">
        <div className="envelope-slot"></div>
        {hasVoted && <div className="envelope"></div>}
      </div>
    </div>
  );
}

export default withAuth(VotingPage);
