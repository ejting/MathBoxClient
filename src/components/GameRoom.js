import React, {useEffect, useState, useRef } from "react";
import { Link, useParams  } from 'react-router-dom';

const GameRoom = ({socket}) =>  {
    const [listOfRandNumbers, setListOfRandNumbers] = useState([]);
    let { roomId } = useParams();

    const getRandomInt = (max, min = 0) => {
        return Math.floor(Math.random() * max) + min;
    }

    useEffect(() => {
        if(!socket){
            return;
        }
    
        
        socket.on("test", () => {
            console.log("Hey i got it in host room");
        });

    }, [socket]);

    useEffect(() => {
        /*const newArray = [getRandomInt(9)];
        setListOfRandNumbers(newArray);*/
        //
        //setListOfRandNumbers(prevArray => [...prevArray, getRandomInt(9)]);
        listOfRandNumbers.push(getRandomInt(9));
        listOfRandNumbers.push(getRandomInt(9));
        listOfRandNumbers.push(getRandomInt(9));
        listOfRandNumbers.push(getRandomInt(9));
        /*setListOfRandNumbers([...listOfRandNumbers]);
        console.log(listOfRandNumbers.length);*/
    }, []);

    const addNewRandNum = (range) => {
        //setListOfRandNumbers([8, 9]);
        console.log("Was added, we have length of " + listOfRandNumbers.length);
        setListOfRandNumbers(prevArray => [...prevArray, getRandomInt(9)]);
        /*
        const newArray = [...listOfRandNumbers, getRandomInt(range)];
        setListOfRandNumbers(newArray);*/
        //listOfRandNumbers.push(getRandomInt(range));

    }

    return (
        <header className="App-header">
            <h1>Hello!</h1>
            <div>
                {listOfRandNumbers && listOfRandNumbers.map((newNum) => {
                    return <p>{newNum}</p>
                })}
            </div>
            <button onClick={()=>{addNewRandNum(9)}}>New</button>
        </header>
    )
}

export default GameRoom;