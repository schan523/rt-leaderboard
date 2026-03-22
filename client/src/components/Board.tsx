import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export type gameTimes = {
    value: string,
    score: number | string
}

const intToTime = (num: number) => {
    return (Math.trunc(num / 10**4)).toString() + ":" + (Math.trunc(num / 100) % 100).toString() + ":" + (num % 100).toString();
}

export const Board = ({game, board} : {game: string, board: gameTimes[]}) => {
    for (let i = 0; i < board.length; i++) {
        if (typeof board[i].score == "number")  {
            board[i].score = intToTime(board[i].score);
        }
    }

    return (
        // component={Paper} turns the table white
        <TableContainer sx={{padding: 5}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{color: "#fff"}}> { game } </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {board.map((row) => (
                        <TableRow key={row.value}>
                            <TableCell sx={{color: 'white'}}> {row.value} </TableCell>
                            <TableCell sx={{color: 'white'}}> {row.score} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
);
}