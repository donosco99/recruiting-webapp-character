import React, { useEffect } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, addCharacter, setInitialState } from '../state/CharacterSlice';
import Character from './Character';
import SkillCheckBox from './SkillCheckBox';
import axios from 'axios';

const CharacterControl = () => {
  const state = useSelector((state)=>state.character);
  const dispatch = useDispatch();
  const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{donosco99}/character';
  
  const fetchInitialState = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data && Object.keys(response.data.body).length > 0) {
          dispatch(setInitialState(response.data.body));
          console.log(response.data.body);
      } else {
        console.log('No valid data returned from API');
      }
    } catch (error) {
      console.error('Failed to fetch initial state:', error);
    }
  };

  useEffect(() => {
    fetchInitialState();
  }, [dispatch]);

  const saveCharacters = async () => {
    try {
      await axios.post(API_URL, state, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Characters saved successfully');
    } catch (error) {
      alert('Failed to save characters:');
      console.log(error);
    }
  };

  return (
    <div>
      <SkillCheckBox characterId={'character-1'}  isParty={true} />
      <Box>
        <Button variant="outlined" onClick={() => dispatch(addCharacter())}>Add Character</Button>
        <Button variant="outlined" onClick={() => dispatch(resetState())}>Reset all Characters</Button>
        <Button variant="outlined" onClick={() => saveCharacters()}>Save Characters</Button>
      </Box>
      <Grid container spacing={4}>
        {Object.keys(state).map((characterId) => (
          <Grid item xs={12} key={characterId}>
            <Character characterId={characterId}  />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CharacterControl;
