import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
import { authContextValue } from '../context/authContext.tsx';
import { customFetch } from '../helpers/index.ts';

import { Board } from './Board.tsx';
// import Paper from '@mui/material/Paper';

export const Leaderboard = () => {
    const { token } = authContextValue();
    const [boards, setBoards] = useState<any[]>([]);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (token == "") {
    //         navigate("/login", { replace: true });
    //     }
    // }, [token]);

    useEffect(() => {    
        const render = async () => {
            // if (!localStorage.getItem("username")) { return; }

            const response = await customFetch('/api/lb/board', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // credentials: 'include'
            });

            if (response.ok) {
                let data = await response.json();
                setBoards(data);
            }
        }
        render();
    }, [token]);

    console.log("board info:", boards);

    return (
        <div> 
            { boards && Object.entries(boards).map(([key, value], index) => ( <Board game={key} board={value} key={index}/> )) }
        </div>
    );
}