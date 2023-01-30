import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Typography, FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";



const Setting = ({setName}) => {
 // const { response, loading, error } = Axios({ url: "/api_category.php" });

  const history = useHistory();



 

  const handleSubmit = (event) => {
    event.preventDefault();
   
    history.push("/question");
  };
  const handleChange = (event) => {
   // dispatch(handleAmountChnage(event.target.value));
   setName(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* <SelectField options={response.trivia_categories} label="category" />
      <SelectField options={difficultyOption} label="Difficulty" />
      <SelectField options={typeOptions} label="Type" />
      <TextFieldCom /> */}
  

 
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Enter your name"
          type="text"
          size="small"
          
        />
      </FormControl>
    </Box>
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default Setting;
