"use client";
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Dialog from "./SGDialog";
import SGDialog from "./SGDialog";

function Homepg() {
    return (
      <Box 
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
       >
        <Container 
         
        >
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to Your Kitchen
          </Typography>
          <SGDialog/>
          <Typography
          textAlign="center" textColor="blue"
          >This is A Demo Website, so no reason to signUp or login, you may enter your pantry manager</Typography>
        </Container>
      </Box>
    );
  }
  
  export default Homepg;