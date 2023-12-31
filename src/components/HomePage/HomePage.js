import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../UI/Button/Button';
import MainTitle from '../UI/MainTitle/MainTitle';

import mockData from '../../utils/mockData.json';
import { useStateContext } from '../../context/StateContext';
import { getLocalStorageItem } from '../../utils/localStorage';

import './HomePage.css';
import 'react-toastify/dist/ReactToastify.css';
import { ELECTION_ACTIONS } from '../../utils/electionConstants';

const citizens = mockData.citizens;

function HomePage() {
  const { finiteStateMachine } = useStateContext();
  const [selcetedId, setSelcetedIdId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (getLocalStorageItem(selcetedId)) {
      toast.error(`You have already voted.`, {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    const citizen = citizens.find(({ id }) => id === selcetedId);
    if (!citizen) {
      toast.error(`Your details doesn't exists in system`, {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }

    finiteStateMachine.transition(ELECTION_ACTIONS.LOGIN);
    navigate('/vote', { state: { citizen } });
  };
  return (
    <div className="container">
      <MainTitle text="Welcome to City Authority Elections!" />
      <input
        type="text"
        data-testid="input-id"
        placeholder="ID"
        value={selcetedId}
        onChange={(e) => setSelcetedIdId(e.target.value)}
      />

      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default HomePage;
