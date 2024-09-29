import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { SKILL_LIST } from '../consts.js'; 
import { useSelector } from 'react-redux';

function SkillCheckBox({ characterId , isParty}) {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [dc, setDC] = useState('');
  const [rollResult, setRollResult] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const state = useSelector((state) => state.character);
  const handleRoll = (characterId) => {
    if (!selectedSkill || !dc) {
      alert('Please select a skill and enter a valid DC.');
      return;
    }
    const roll = Math.floor(Math.random() * 20) + 1; 
    const skillObj = state[characterId].skills[selectedSkill.toLowerCase()];
    const total = roll + skillObj.value + skillObj.modifier; 
    // console.log(skillObj);
    console.log(isParty);
    // Logic here for party skill check by finding the character having max total for selected skill

    setRollResult(roll);
    console.log(characterId);
    if (total >= dc) {
      setCheckResult('Success');
    } else {
      setCheckResult('Failure');
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div">
         {isParty ? 'Party Skill Check' : 'Skill Check for individual'}
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Select Skill</InputLabel>
          <Select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            label="Select Skill"
          >
            {SKILL_LIST.map((skill) => (
              <MenuItem key={skill.name} value={skill.name}>
                {skill.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="DC"
          type="number"
          value={dc}
          onChange={(e) => setDC(e.target.value)}
          fullWidth
        />
        <Button variant="outlined" onClick={()=>handleRoll(characterId)} fullWidth>
          Roll
        </Button>
        {rollResult !== null && (
          <Typography variant="body1">
            Roll: {rollResult}, Result: {checkResult}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default SkillCheckBox;
