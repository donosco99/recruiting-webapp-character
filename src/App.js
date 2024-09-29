import { useState } from 'react';
import { Container, Typography } from '@mui/material';

import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Character App
        </Typography>
      </Container>

    </div>
  );
}

export default App;
