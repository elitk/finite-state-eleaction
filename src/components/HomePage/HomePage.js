import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFiniteStateMachine from '../../hooks/useFiniteStateMachine';
import { ELECTION_STATES, ELECTION_TRANSITIONS } from '../../utils/electionConstants'; 
import { getLocalStorageItem } from '../../utils/localStorage';
import mockData from '../../utils/mockData.json';
import Button from '../UI/Button/Button';
import MainTitle from '../UI/MainTitle/MainTitle';
import './HomePage.css';

const users = mockData.voters;
const cities = mockData.cities;

function HomePage() {
  const [state, dispatch] = useFiniteStateMachine(
    ELECTION_STATES.NOT_LOGGED_IN,
    ELECTION_TRANSITIONS
  );

  const [id, setId] = useState('');
  const [city, setCity] = useState(cities[0].name);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (getLocalStorageItem(id)) {
      alert('You have already voted.');
      return;
    }
    if (!users[city]) {
      alert('Invalid City');
      return;
    }
    const user = users[city].find((user) => user.id === id);
    if (user) {
      dispatch('LOGIN');
      navigate('/vote', { state: { user, city } });
    } else {
      alert('Invalid ID');
    }
  };
  return (
    <div className="container">
      <MainTitle text="Welcome to City Authority Elections!" />
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <select id="citySelect" onChange={(e) => setCity(e.target.value)}>
        {cities.map((city) => {
          return (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default HomePage;
