import { useState } from 'react';
import { authContextValue } from '../context/authContext.tsx';

export const Leaderboard = () => {
    const { token } = authContextValue();
    const [board, setBoard] = useState();

    const render = async () => {

        const response = await fetch('/api/lb/board', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token }` 
            },
        });

        if (response.ok) {
            let data = await response.json();
            console.log("this is the board:", data);
            setBoard(data);
        }
    }
    render();

    return (
        <div> 
            <h2> { board } </h2>    
        </div>
    );
}