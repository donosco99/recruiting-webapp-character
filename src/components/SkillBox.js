import React from 'react';
import { Button, Card, CardContent, Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { incrementSpentSkill, decrementSpentSkill } from '../state/CharacterSlice.js';

function SkillsBox({ characterId }) {
//   const characterId = 'character-1';
  const skills = useSelector((state) => state.character[characterId].skills);
  const totalSkillBudget = useSelector((state) => state.character[characterId].totalSkillBudget);
  const dispatch = useDispatch();

  return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                Total Skill Budget: {totalSkillBudget}            
                </Typography>
                <ul>
                {Object.keys(skills).map(attr => (
                    <li key={attr}>
                        {attr}: 
                        <span> Spent: {skills[attr].value} </span> {/* First hardcoded number */}
                        <span> Modifier ({skills[attr].modifierName}): {skills[attr].modifier} </span> {/* Second hardcoded number */}
                        <span> Total : {skills[attr].modifier + skills[attr].value} </span> {/* Second hardcoded number */}
                            <div>
                                <Button variant="outlined" onClick={()=> dispatch(incrementSpentSkill({ skill: attr, characterId:characterId}))}>+</Button>
                                <Button variant="outlined" onClick={()=>dispatch(decrementSpentSkill({ skill: attr, characterId:characterId}))}>-</Button>
                            </div>
                    </li>
                ))}
            </ul>

            </CardContent>
        </Card>

      );
    }

export default SkillsBox;
