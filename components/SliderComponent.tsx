import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSliderSteps() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="hours"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={1}
        marks
        min={1}
        max={48}
        valueLabelDisplay="auto"
      />
      <Slider
        aria-label="days"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={1}
        marks
        min={1}
        max={60}
        valueLabelDisplay="auto"
      />
      <Slider
        aria-label="months"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={1}
        marks
        min={1}
        max={24}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}