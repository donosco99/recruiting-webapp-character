import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { CLASS_LIST } from '../consts.js';
import { useSelector } from 'react-redux';

function ClassesBox({ characterId }) {
  const classes = useSelector((state) => state.character[characterId].classes);
  const [selectedClass, setSelectedClass] = useState(null);
  const handleClassClick = (className) => {
    setSelectedClass(className);
  };
  const handleClose = () => {
    setSelectedClass(null);
  };
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div">
            Classes (Click on each class to view requirements)
            <ul>
              {Object.keys(classes).map((className) => {
                const doesMeetRequirements = classes[className].doesMeetRequirements;
                return (
                  <li key={className} style={{ color: doesMeetRequirements ? 'red' : 'black', cursor: 'pointer' }} onClick={() => handleClassClick(className)}>
                    {className}
                  </li>
                );
              })}
            </ul>
          </Typography>
        </CardContent>
      </Card>
      {selectedClass && (
        <Card variant="outlined" style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {selectedClass} Requirements
            </Typography>
            <ul>
              {Object.keys(CLASS_LIST[selectedClass]).map((attribute) => (
                <li key={attribute}>
                  {attribute}: {CLASS_LIST[selectedClass][attribute]}
                </li>
              ))}
            </ul>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ClassesBox;
