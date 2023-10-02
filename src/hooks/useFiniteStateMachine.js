import { useState, useEffect } from 'react';
import FiniteStateMachine from "@elitk/finite-state-machine"

function useFiniteStateMachine(initialState, transitions) {
  const fsm = new FiniteStateMachine(initialState, transitions);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const listener = (newState, action) => {
      console.log(`Transitioned to ${newState} due to action ${action}`);
      setState(newState);
    };
    fsm.addEventListener(listener);
  }, [fsm]);
  function dispatch(action) {
    const newState = fsm.transition(action);
    setState(newState);
  }
  return [state, dispatch];
}

export default useFiniteStateMachine;
