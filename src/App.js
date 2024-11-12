import Main from "./Main.js";
import {useState, useEffect} from "react";
import { io } from "socket.io-client";
import useCorrectHTTP from "./hooks/useCorrectHTTP";

function App() {

  const [socket, setSocket] = useState(null);


  useEffect(() => {
      setSocket(io(useCorrectHTTP));
  }, []);

  return(
    <div className="App">
      <Main socket={socket}/>
    </div>
  )
}

export default App;
