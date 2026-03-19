import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authContextValue } from '../context/authContext.tsx';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';

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
            setBoard(data);
        }
    }
    render();

    return (
        <div> 
            {/* component={Paper} turns the table white */}
            { board && <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Hollow Knight </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {board.map((row) => (
                            <TableRow>
                                <TableCell> {row.value} </TableCell>
                                <TableCell> {row.score} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> }
        </div>
    );
}