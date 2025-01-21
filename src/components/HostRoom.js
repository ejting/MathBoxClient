import React, {useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../css/host.css";

let gameStarted = false;
const TEMP_USERNAME = "Test username";

const HostRoom = ({socket}) =>  {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [roomExists, setRoomExists] = useState(-1);
    const [isHost, setIsHost] = useState(false);
    let { roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!socket){
            return;
        }
    
        //it is because I made it async now it works perfectly
        socket.on("test", () => {
            console.log("Hey i got it in host room");
        });
        socket.on("RoomExistence", (doesRoomExist, hostStatus) => {
            console.log("Does it exist? " + doesRoomExist);
            setRoomExists(doesRoomExist);
            if(hostStatus) {
                setIsHost(true);
            }
            else {
                socket.emit("join-room-with-id", roomId, TEMP_USERNAME);
                socket.off("NewUserJoinRoom");
                socket.off("UserLeftRoom");
            }
        });
        socket.on("NewUserJoinRoom", (givenUserName) => {
            //listOfUsers.push(givenUserName);
            setListOfUsers([...listOfUsers, givenUserName]);
            console.log("I just had a new user join! " + givenUserName);
            
        });
        socket.on("UserLeftRoom", (givenUserName) => {
            listOfUsers.splice(listOfUsers.indexOf(givenUserName));
            setListOfUsers([...listOfUsers]);
            console.log("I just had a user leave: " + givenUserName);
        });
        socket.on("GoToMainGameRoom", (givenUserName) => {
            navigate(`/game-room/${roomId}`);
        });
        socket.on("ForceAllLeaveRoom", () => {
            gameStarted = false;
            navigate(`/`);
        });
        

        socket.emit("does-room-exist", roomId);
        
        return () => {
          socket.off("test");
          socket.off("RoomExistence");
          socket.off("GoToMainGameRoom");
          socket.off("ForceAllLeaveRoom");
          socket.off("NewUserJoinRoom");
          socket.off("UserLeftRoom");

          // May cause errors, may need to check if we are the host
          /*if(isHost) {
            socket.off("NewUserJoinRoom");
            socket.off("UserLeftRoom");
            
          }*/
          
        }
    
    }, [socket]);

    // On join
    useEffect(() => {
        console.log("Room id is " + roomId);
        return () => {
            if(!gameStarted) {
                // Tells the server that we left the room
                console.log("left the room");
                if(socket != null) {
                    socket.emit("left-host-room", TEMP_USERNAME);
                }
            }
            gameStarted = false;
        }
    }, []);

    const startGame = () => {
        if(!gameStarted) {
            gameStarted = true;
            socket.emit("start-math-box-game", roomId);
        }
    }

    const goBackToMain = () => {
        navigate(`/`);
    }
    


    return(
        <header className="App-header">
            {roomExists == -1 ? (<div>
                <h1>Loading Room...</h1>
            </div>) :
                roomExists == 0 ? (<div>
                    <h1>ERROR! Room does not exist.</h1>

                    <h2>Click button to leave</h2>
                    <button onClick={() => {goBackToMain()}}>Go Back</button>
                </div>) :
                (<div>
                

                {isHost ? (<div>
                    <h1>Room Key: {roomId}</h1>
                    <div className="container">

                    <h2>Joined Users:</h2>
                    <div className="list-of-users">
                        {listOfUsers.map((theUser) => {
                            return <p>{theUser}</p>
                        })}
                    </div>


                    <div className="buttons">
                        <button className="join-btn" onClick={startGame}>Start Game</button>
                        <button onClick={() => {goBackToMain()}}>Go Back</button>

                    </div>
                </div>
                </div>) : (<div>
                    <h1>Waiting on the Host to start the game...</h1>
                </div>)}
  
                
                </div>)
            }
  

        </header>
    )
}

export default HostRoom;