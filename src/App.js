import Main from "./Main.js";
import {useState, useEffect} from "react";
import { io } from "socket.io-client";
import useCorrectHTTP from "./hooks/useCorrectHTTP";
import {Routes, Route} from "react-router-dom";
import HostRoom from "./components/HostRoom.js";

function App() {

  const [socket, setSocket] = useState(null);


  useEffect(() => {
      setSocket(io(useCorrectHTTP));
  }, []);

  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Main socket={socket}/>}/>
        <Route path="/game-room/:roomId" element={<HostRoom socket={socket}/>}/>
      </Routes>
    </div>
  )
}

export default App;
