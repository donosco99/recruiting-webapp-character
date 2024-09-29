import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { adjustAttribute, decrementAttribute, incrementAttribute } from '../state/CharacterSlice.js';

function AttributesBox({ characterId }) {
    // const characterId = 'character-1';
  const attributes = useSelector((state) => state.character[characterId].attributes);
  const dispatch = useDispatch();
  const calculateModifier = (attributeValue) => Math.floor((attributeValue - 10) / 2);

  return (
        <Card variant="outlined">
            <CardContent>
            <Typography variant="h5" component="div">
                Attributes
            </Typography>
            <ul>
                    {Object.keys(attributes).map(attr => (
                        <li key={attr}>
                            {attr}: 
                            <span> {attributes[attr]} </span> 
                            <span> , Modifier: {calculateModifier(attributes[attr])} </span> 
                            <div>
                                <Button variant="outlined" onClick={() => dispatch(adjustAttribute({ attribute: attr, change: 1 , characterId:characterId}))}>+</Button>
                                <Button variant="outlined" onClick={() => dispatch(adjustAttribute({ attribute: attr, change: -1, characterId:characterId }))}>-</Button>
                            </div>

                        </li>
                    ))}
                </ul>

            </CardContent>
        </Card>      
  );
}

export default AttributesBox;
