import Main from "./Main.js";
import {useState, useEffect} from "react";
import { io } from "socket.io-client";
import useCorrectHTTP from "./hooks/useCorrectHTTP";
import {Routes, Route} from "react-router-dom";
import JoinRoom from "./components/JoinRoom.js";
import HostRoom from "./components/HostRoom.js";
import GameRoom from "./components/GameRoom.js";

import DevTestEngine from "./math-components/DEVTestEngine.js";

function App() {

  const [socket, setSocket] = useState(null);


  useEffect(() => {
      setSocket(io(useCorrectHTTP));
  }, []);

  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Main socket={socket}/>}/>
        <Route path="/join" element={<JoinRoom socket={socket}/>}/>
        <Route path="/host-room/:roomId" element={<HostRoom socket={socket}/>}/>
        <Route path="/game-room/:roomId" element={<GameRoom socket={socket}/>}/>
        <Route path="/DEV-Test" element={<DevTestEngine socket={socket}/>}/>
      </Routes>
    </div>
  )
}

export default App;
