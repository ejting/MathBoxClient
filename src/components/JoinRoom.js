import React, {useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

const JoinRoom = () =>  {

    const [typedId, setTypedId] = useState();
    const navigate = useNavigate();

    const goToRoom = () => {
        navigate(`../host-room/${typedId}`);
    }

    const goBackToMain = () => {
        navigate(`/`);
    }

    return (
        <header className="App-header">
            <h1>Join MathBox Game</h1>
            <form onSubmit={goToRoom}>
                <label for="room id">Room Id:</label>
                <input type="text" onChange={(e) => setTypedId(e.target.value)}/>
                <button type="submit">Join</button>
            </form>
            <button onClick={() => {goBackToMain()}}>Go Back</button>
        </header>
    )
}

export default JoinRoom;