// import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Provider } from 'react-redux';
import store from './state/store';
import CharacterControl from './components/CharacterControl'; 

import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <Provider store={store}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            Character App
          </Typography>
          <CharacterControl />
        </Container>
       </Provider>

    </div>
  );
}

export default App;
