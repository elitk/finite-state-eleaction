import React, { createContext, useContext } from 'react';
import useFiniteStateMachine from '../hooks/useFiniteStateMachine';
import {
  ELECTION_STATES,
  ELECTION_TRANSITIONS,
} from '../utils/electionConstants';

export const StateContext = createContext(undefined);

export function StateProvider({ children }) {
  const { dispatch, isUserLoggedIn, isUserVoted } = useFiniteStateMachine(
    ELECTION_STATES.NOT_LOGGED_IN,
    ELECTION_TRANSITIONS
  );

  return (
    <StateContext.Provider
      value={{
        isUserLoggedIn,
        isUserVoted,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useState must be used within a StateProvider');
  }

  return context;
}
