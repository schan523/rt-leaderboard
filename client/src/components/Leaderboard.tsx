import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authContextValue } from '../context/authContext.tsx';

export const Leaderboard = () => {
    const { token } = authContextValue();
    const [board, setBoard] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (token == "") {
            navigate("/login", { replace: true });
        }
    }, [token]);


    const render = async () => {
        if (token == "") {
            return;
        }

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