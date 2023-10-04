import React, { createContext, useContext } from 'react';

export const StateContext = createContext(undefined);

export function StateProvider({ children, finiteStateMachine }) {
  return (
    <StateContext.Provider
      value={{
        finiteStateMachine,
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
