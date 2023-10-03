import { useState, useEffect } from 'react';
import FiniteStateMachine from '@elitk/finite-state-machine';
import {
  ELECTION_STATES,
  ELECTION_TRANSITIONS,
} from '../utils/electionConstants';

const fsm = new FiniteStateMachine(
  ELECTION_STATES.NOT_LOGGED_IN,
  ELECTION_TRANSITIONS
);

function useFiniteStateMachine() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserVoted, setIsUserVoted] = useState(false);

  useEffect(() => {
    const listener = (newState, action) => {
      console.log(`Transitioned to ${newState} due to action ${action}`);
    };
    fsm.addEventListener(listener);
  }, []);

  function dispatch(action) {
    switch (action) {
      case 'LOGIN':
        setIsUserLoggedIn(true);
        break;
      case 'VOTE':
        setIsUserVoted(true);
        break;
      case 'LOGOUT':
        setIsUserLoggedIn(false);
        break;
      default:
        break;
    }

    fsm.transition(action);
  }

  return { dispatch, isUserLoggedIn, isUserVoted };
}

export default useFiniteStateMachine;
