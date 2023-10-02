import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ELECTION_STATES, ELECTION_TRANSITIONS,} from '../../utils/electionConstants'; 
import useFiniteStateMachine from '../../hooks/useFiniteStateMachine';
import MainTitle from '../UI/MainTitle/MainTitle';
import Button from '../UI/Button/Button';
import './ConfirmationPage.css';

function ConfirmationPage() {
  const [state, dispatch] = useFiniteStateMachine(
    ELECTION_STATES.VOTED,
    ELECTION_TRANSITIONS
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch('CONFIRM'); 
    navigate('/');
  };
  
  return (
    <div className="confirm-container">
      <MainTitle text="Thank you for your voting!" />
      <Button className="button-container" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default ConfirmationPage;
