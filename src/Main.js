import React, {useEffect, useState} from "react";

const Main = ({socket}) =>  {
    
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/users").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);

  useEffect(() => {
    if(!socket){
        return;
    }

    //it is because I made it async now it works perfectly
    socket.on("test", () => {
        console.log("Hey i got it");
    });

}, [socket]);


  return (
    <div className="Main">
      <header className="App-header">
        {(typeof backendData.users === "undefined") ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
        <h1>TEST</h1>
      </header>
    </div>
  );
}

export default Main;