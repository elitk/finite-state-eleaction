import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { ELECTION_STATES } from '../utils/electionConstants';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { finiteStateMachine } = useContext(StateContext);

    if (finiteStateMachine.state !== ELECTION_STATES.LOGGED_IN) {
      return <Navigate to="/" />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
