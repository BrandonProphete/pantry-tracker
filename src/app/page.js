"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Homepg from './part/app2/Homepg.js';
import CustomTabPanel from './part/CustomTabPanel.js';

export default function Home() {
    const [value, setValue] = React.useState(0); 
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }} height="100vh">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Inventory Management" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Homepg />
        </CustomTabPanel>
      </Box>
    );
  }