class FiniteStateMachine {
  constructor(initialState, transitions) {
    this.state = initialState;
    this.transitions = transitions;
    this.eventListeners = [];
  }
  get currentState() {
    return this.state;
  }
  set currentState(newState) {
    if (this.transitions[newState]) {
      this.state = newState;
    } else {
      throw new Error(`Cannot set to an undefined state: ${newState}`);
    }
  }
  addEventListener(callback) {
    this.eventListeners.push(callback);
  }
  transition(action) {
    const transitionForCurrentState = this.transitions[this.state];
    if (!transitionForCurrentState) {
      throw new Error(`No transitions defined for state '${this.state}'`);
    }
    const nextState = transitionForCurrentState[action];
    if (!nextState) {
      throw new Error(
        `No transition from state '${this.state}' using action '${action}'`
      );
    }
    this.state = nextState;
    this.eventListeners.forEach((listener) => listener(this.state, action));

    return this.state;
  }
}

module.exports = FiniteStateMachine;
