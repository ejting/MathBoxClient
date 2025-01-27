import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState, useRef } from "react";
import "../css/math_test.css";

let input = "";

const DIGIT_COUNT = 4;
const UPPER_DIGIT_RANGE = 10;
const LOWER_DIGIT_RANGE = 0;

const DevTestEngine = ({socket}) =>  {

    const navigate = useNavigate();
    const [numberToMake, setNumberToMake] = useState(0);
    const [givenNumbers, setGivenNumbers] = useState([]);
    const [displayedInput, setDisplayedInput] = useState("");
    const [computation, setComputation] = useState("");

    useEffect(() => {
        // Temporary tester for having values at the start
        // Serves as a "mounter" for values we should already have / grabbed

        console.log("Start random number making");
        const tempList = [];
        for(let i = 0; i < DIGIT_COUNT; i++) {
            //setGivenNumbers([...givenNumbers, getRandomDigit()]);
            tempList.push(getRandomDigit(LOWER_DIGIT_RANGE, UPPER_DIGIT_RANGE));
        }
        setGivenNumbers([...givenNumbers, ...tempList]);

        setNumberToMake(getRandomDigit(0, 1000));

        //setGivenNumbers((prevArray) => [...prevArray, ...tempList]);
        console.log("made the new list of numbers => " + tempList);

        
    }, []);


    const getRandomDigit = (lower, upper) => {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }

    

    const goBackToMain = () => {
        navigate(`/`);
    }

    const isDigit = (char) => {
        return char >= '0' && char <= '9';
    }

    const computeInput = (tokenizer) => {
        
        const stack = [];

        for(let i = 0; i < tokenizer.length; i++) {
            // Add the first number to the stack, then
            // Find the operator. If the operator found has () right
            // next to it, go into that and find an operater with a number next to it
            //console.log("What is my stack at? " + stack + " and " + tokenizer[i] + "and what?? " );
            if(stack.length == 0) {
                stack.push(tokenizer[i]);
            }
            else if(!Number.isInteger(tokenizer[i])) {
                if(i < tokenizer.length && Number.isInteger(tokenizer[i + 1])) {
                    let oldNum = stack.pop();
                    let newNum = 0;
                    //console.log(`The two nums is ${oldNum} and ${tokenizer[i + 1]}`);
                    switch(tokenizer[i]) {
                        case '+':
                            newNum = oldNum + tokenizer[i + 1];
                            break;
                        case '-':
                            newNum = oldNum - tokenizer[i + 1];
                            break;
                        case '*':
                            newNum = oldNum * tokenizer[i + 1];
                            break;
                        case '/':
                            newNum = oldNum / tokenizer[i + 1];
                            break;
                    }
                    stack.push(newNum);
                    i++;
                } 
            }

        }
        

        setComputation(stack[0]);

    }

    const validateInputToCompute = () => {
        
        // Break down input through an array, and then
        // Process the input to ensure it is valid, send tokenized
        // equations to compute input

        let tokenizer = [];
        let grabbedInput = "";
        let validated = 0;
        
        // If the length of the input is one, just check if its a digit or not
        if(input.length === 1) {
            if(isDigit(input.charAt(0))) {
                return [input.charAt(0)];
            }
        }

        for(let i = 0; i < input.length; i++) {
            //console.log(grabbedInput);
            if(validated == 0) {
                grabbedInput = input.charAt(i);
                validated = isDigit(grabbedInput) ? 1 : 2;
            }
            if(validated == 1) {
                if(i == input.length - 1 || !isDigit(input.charAt(i + 1))) {
                    tokenizer.push(Number(grabbedInput));
                    validated = 0;
                }
                else {
                    grabbedInput += input.charAt(i + 1);
                }
            }
            else if(validated == 2) {
                if(i == input.length - 1 || isDigit(input.charAt(i + 1))) {
                    tokenizer.push(grabbedInput);
                    validated = 0;
                }
                else {
                    grabbedInput += input.charAt(i + 1);
                }
            }
        }

        //console.log(`So input is ${input}, tokenizer: ${tokenizer}`);

        computeInput(tokenizer);
    }

    const inputNumber = (number) => {
        input += number
        setDisplayedInput(input);
        validateInputToCompute();
    }

    const inputOperator = (operator) => {
        input += operator
        setDisplayedInput(input);
        validateInputToCompute();
    }

    const deleteInput = () => {
        input = input.toString().slice(0, -1);
        setDisplayedInput(input);
        validateInputToCompute();
    }
    
    // Draggable Unit to hold either math operations or
    // numbers
    //
    const DraggableUnit = ({heldToken}) => {
        return (
            <div
                draggable="true"
            >
                {heldToken}
            </div>
        );
    }

    // Following this tutorial:
    //https://www.youtube.com/watch?v=O5lZqqy7VQE
    // For drag and drop UI

    return(
        <header className="App-header">
            <div className="horizontal-organizer">
                <h1 className="math-title">Make the Number {numberToMake} | {displayedInput} --&gt; {computation} | <DraggableUnit heldToken={1}/></h1>

                <div className="answer-box">

                </div>
                {/*
                <div className="number-pad">
                    <div className="number-row">
                        <button onClick={() => {inputNumber(1)}}>1</button>
                        <button onClick={() => {inputNumber(2)}}>2</button>
                        <button onClick={() => {inputNumber(3)}}>3</button>
                    </div>
                    <div className="number-row">    
                        <button onClick={() => {inputNumber(4)}}>4</button>
                        <button onClick={() => {inputNumber(5)}}>5</button>
                        <button onClick={() => {inputNumber(6)}}>6</button>
                    </div>
                    <div className="number-row">
                        <button onClick={() => {inputNumber(7)}}>7</button>
                        <button onClick={() => {inputNumber(8)}}>8</button>
                        <button onClick={() => {inputNumber(9)}}>9</button>
                    </div>
                    <div className="number-row">
                        <button onClick={() => {inputNumber(0)}}>0</button>
                        <button onClick={() => {deleteInput()}}><FontAwesomeIcon icon={faLongArrowLeft}/></button>
                    </div>
                </div>
                */}
                <button onClick={() => {deleteInput()}}><FontAwesomeIcon icon={faLongArrowLeft}/></button>
                <div className="number-options-container">
                    {givenNumbers.map((number, index) => {
                        return <button
                            onClick={() => {inputNumber(number)}}
                            key={index}
                        >
                            {number}    
                        </button>
                    })}
                </div>

                <button onClick={() => {inputOperator('+')}}>+</button>
                <button onClick={() => {inputOperator('-')}}>-</button>
                <button onClick={() => {inputOperator('*')}}>*</button>
                <button onClick={() => {inputOperator('/')}}>/</button>
                <button onClick={() => {inputOperator('(')}}>(</button>
                <button onClick={() => {inputOperator(')')}}>)</button>
            </div>


            
        <button onClick={() => {goBackToMain()}}>Go Back</button>
        </header>
    );
}



export default DevTestEngine;