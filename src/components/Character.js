import React from 'react';
import SkillCheckBox from './SkillCheckBox';
import AttributesBox from './AttributeBox';
import ClassesBox from './ClassBox';
import SkillsBox from './SkillBox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Character({ characterId }) {
  return (
    <Box sx={{ padding: 2, marginBottom: 4, border: '1px solid', borderRadius: '8px' }}>
      <Typography variant="h6" component="div" >
       Edit panel for: {characterId}
      </Typography>
      <SkillCheckBox characterId={characterId} isParty={false} />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <AttributesBox characterId={characterId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ClassesBox characterId={characterId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SkillsBox characterId={characterId} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Character;
