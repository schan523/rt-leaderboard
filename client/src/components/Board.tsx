import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export type gameTimes = {
    value: string,
    score: number
}

export const Board = ({game, board} : {game: string, board: gameTimes[]}) => {
    return (
        // component={Paper} turns the table white
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> { game } </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {board.map((row) => (
                        <TableRow key={row.value}>
                            <TableCell> {row.value} </TableCell>
                            <TableCell> {row.score} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}