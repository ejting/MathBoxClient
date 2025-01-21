import React, {useEffect, useState, useRef } from "react";
import { Link, useNavigate} from 'react-router-dom';
import './main.css';


const symbols = ['∑', '∫', '∞', 'π', 'θ', 'δ', 'Δ', '≠', '≡', '√', '∝', '∧', '∨', '≈', '∞', '∂', '⊕', '⊗', '∇', '∈'];
//const symbols = ["a", "b", "c"];

let timers = [];

const Main = ({socket}) =>  {
    
  const [backendData, setBackendData] = useState([{}]);
  const [rain, setRain] = useState();
  const navigate = useNavigate();

  const symbolHolder = useRef();
  

 /* useEffect(() => {
    fetch("/api/users").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);*/
  function rainSymbols() {
    const symbol = document.createElement('div');
    symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    const leftPosition = Math.random() * 100;
    symbol.style.left = `${leftPosition}%`;
    //symbol.style.animationDelay = `${Math.random() * 5}s`;
    symbol.style.fontSize = `${Math.random() * 1.5 + 2.5}em`;
    symbol.classList.add("text");
    symbolHolder.current.appendChild(symbol);



    let timer = setTimeout(() => {
      //! Temporary solution to page crashing after leaving site while
      //! timeouts are still running
      symbolHolder.current.removeChild(symbol);
      timers.splice(timer, 1);
      
    }, 2000);
    timers.push(timer);
  }


  useEffect(() => {

    let timer;
    let intervalId = setInterval(() => {
      timer = rainSymbols();
    }, 200);

    console.log("Did we add the symbols?");

    return () => {
      clearInterval(intervalId);
      // Scuffed, but clears all timers
      for(let i = timers.length - 1; i >= 0; i--) {
        clearTimeout(timers.pop());
      }
    };
    
  }, []);

  useEffect(() => {
    if(!socket){
        return;
    }

    //it is because I made it async now it works perfectly
    socket.on("test", () => {
        console.log("Hey i got it");
    });

    socket.on("GetGameRoomId", (newRoomId) => {
      
      console.log("Hey i got it " + newRoomId);
      navigate(`/host-room/${newRoomId}`);
      
      
      //history.push(`/game-room/${newRoomId}`);
  });

    return () => {
      socket.off("test");
      socket.off("GetGameRoomId");
    }

  }, [socket]);

  async function getNewRoom() {
    await socket.emit("make-new-room");
  }

  const GoToJoinRoom = () => {
    navigate("/join");
  }

  const GoToDevTest = () => {
    navigate("/Dev-Test");
  }




  return (
    <div className="Main">
      <header className="App-header">
        {/*(typeof backendData.users === "undefined") ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )*/}

        <h1>MathBox</h1>

        <div className="container">

            <div className="scrolling-symbols" ref={symbolHolder}>
            </div>


            <div className="buttons">
              <button className="host-btn" onClick={getNewRoom}>Host</button>
              <button className="join-btn" onClick={() => {GoToJoinRoom()}}>Join</button>

              <button className="host-btn" onClick={() => {(GoToDevTest())}}>Dev Test</button>

            </div>
        </div>
      </header>
      
    </div>
  );
}

export default Main;