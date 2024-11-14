import React, {useEffect, useState, useRef } from "react";
import { Link, useParams  } from 'react-router-dom';
import "../css/host.css";

const HostRoom = ({socket}) =>  {
    const [roomExists, setRoomExists] = useState(-1);
    const [isHost, setIsHost] = useState(false);
    let { roomId } = useParams();

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
        });
        

        socket.emit("does-room-exist", roomId);
        
    
        return () => {
          socket.off("test");
        }
    
    }, [socket]);

    // On join
    useEffect(() => {
        console.log("Room id is " + roomId);

    }, []);
    


    return(
        <header className="App-header">
            {roomExists == -1 ? (<div>
                <h1>Loading Room...</h1>
            </div>) :
                roomExists == 0 ? (<div>
                    <h1>ERROR! Room does not exist.</h1>
                </div>) :
                (<div>
                <h1>Room Key: {roomId}</h1>

                {isHost ? (<h3>You are the host</h3>) : (null)}
  
                <div className="container">

                    <div className="scrolling-symbols">
                    </div>


                    <div className="buttons">
                        <button className="join-btn">Start Game</button>

                    </div>
                </div>
                </div>)
            }
  

        </header>
    )
}

export default HostRoom;