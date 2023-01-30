
import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { Link } from 'react-router-dom';

import { getQuestions } from "../redux/actions/questions";


const Questions = ({name}) => {



 

 

 
  const history = useHistory();
  const dispatch = useDispatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(10);
  const [step, setStep] = useState(0);
  const [currentAnsewr, setcurrentAnsewr] = useState("");
  const questions = useSelector((state) => state.questions.questions);
  
  const loading = useSelector((state) => state.questions.loading);
  
  const error = useSelector((state) => state.questions.error);
  
  //console.log("ggU", "dfdf");
  useEffect(() => {
   if(step==1){
// setInterval(myTimer, 1000);
setCounter(10);
   }
    
  }, [step]);
  useEffect(() => {
    if(counter==0){
 // setInterval(myTimer, 1000);
 if (questionIndex + 1 < questions.length) {
  setQuestionIndex(questionIndex + 1);

}
if (questionIndex + 1 >= questions.length&&step==1) {
  setStep(step+1);

}
 setCounter(10);
    }
     
   }, [counter]);


  useEffect(() => {
   
    dispatch(getQuestions());
  }, []);

  
  useEffect(() => {
  
    if (questions?.length) {
     
      const question = questions[questionIndex];
      let answers =question.options ;
   
      setOptions(answers);
    }
  
  }, [questions, questionIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
     
     
      setCounter((prevCounter) => prevCounter -1);
     
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
   
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleStart = () => {
    setStep(step+1);
  };

  const handleClickAnswer = (event) => {
    const question = questions[questionIndex];
    setcurrentAnsewr(options[question.answer]);
    if (event.target.textContent === options[question.answer]) {
     
      setScore(score + 1);
      
    }

    if (questionIndex + 1 < questions.length) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        setcurrentAnsewr("");
        setCounter(10);
      }, 3000);
     
    } else {
     // history.push("/score");
    }
  };

  const handleBackToSettings = () => {
   
     history.push("/");
   };
 
  
 



  return (
    
    <Box>
      {(questions.length>0&&step==1)&&( <div className="instructions-container" style={{minHeight:"500px"}}><Box> 
        <Typography variant="h4">Questions {questionIndex + 1}</Typography>
        <Typography variant="h4">you have {counter} seconds</Typography>
      <Typography mt={5}>
        {decode(questions[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button fullWidth onClick={handleClickAnswer} variant="contained" style={{color:currentAnsewr==data?"green":currentAnsewr!=""?"red":""
          }}>
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
      <Button onClick={handleClickAnswer} variant="contained" style={{backgroundColor:"green",color:"white"}}>
           Skip
          </Button> 
      </Box> 

      </Box></div>)}

      {(questions.length>0&&step==0)&&(<Box> 
        {/* <Typography variant="h4">Welcome to quiz {name}</Typography>
        <Typography variant="h10">this  {questions.length} quiz generated from {" "}</Typography>
        <Typography variant="h10">http://alephtavconsult.com</Typography>
        <Typography variant="h4">Here are the rules </Typography>
        <Box style={{backgroundColor:"blue",color:"white"}} >
        <Typography variant="h5">* you have 10 seconds to answer each questions</Typography>
        <Typography variant="h5">* you can skip difficult questions</Typography>
        <Typography variant="h5">* when you select answer the quiz will go to the next question</Typography>
        <Typography variant="h5">* you can skip difficult questions</Typography>
        <Typography variant="h5">* when you select right answer it becomes green</Typography>
        <Typography variant="h5">and when you select wrong answer it becomes red</Typography>
        <Typography variant="h5"> *you will see your score at the end .Good luck</Typography>
        <Button onClick={handleStart} variant="contained" style={{backgroundColor:"green",color:"white"}}>
           Start
          </Button> 
        </Box> */}
             <div className="instructions-container">
            <h1>Welcome to quiz {name}</h1>
            {/* <p>this  {questions.length} quiz generated from {"http://alephtavconsult.com "}</p> */}
            <p>Here are the rules</p>
            <ul className="browser-default" id="main-list">
                <li>you have 10 seconds to answer each questions</li>
                <li>when you select answer the quiz will go to the next question</li>
                <li>
                you can skip difficult questions
                </li>
                <li>
                when you select right answer it becomes green
                </li>
                <li>
                and when you select wrong answer it becomes red
                    {/* <ul id="sublist">
                        <li>Two 50-50 chances</li>
                        <li>Five hints</li>
                    </ul> */}
                </li>

            </ul>
            <div className="confirm-button">
          
                <span onClick={handleStart} className="right confirm-buttons" id="proceed">Start Now</span>
            </div>
        </div>
      </Box>)}
      {(questions.length>0&&step==2)&&( <Box mt={30}>
       <Typography variant="h3" fontWeight="bold" mb={3}>
         Final Score {score}
       </Typography>
       <Button onClick={handleBackToSettings} variant="outlined">
         Restart!
       </Button>
     </Box>)}
    </Box>

  );
};

export default Questions;
