import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../UI/MainTitle/MainTitle';

import './ConfirmationPage.css';
import { useStateContext } from '../../context/StateContext';
import { ELECTION_ACTIONS } from '../../utils/electionConstants';

function ConfirmationPage() {
  const { finiteStateMachine } = useStateContext();
  const navigate = useNavigate();

  setTimeout(() => {
    finiteStateMachine.transition(ELECTION_ACTIONS.LOGOUT);
    navigate('/');
  }, 3000);

  return (
    <div className="confirm-container">
      <MainTitle text="Thank you for your voting!" />
      <p> Redirecting back to home page</p>
    </div>
  );
}

export default ConfirmationPage;
