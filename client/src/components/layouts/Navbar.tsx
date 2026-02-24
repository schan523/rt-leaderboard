import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContextValue } from '../../context/authContext';
import { Dropdown } from './Dropdown';
import '../../styles/Navbar.css';

import * as jose from 'jose'; 

export const Navbar = () => {
    const { token } = authContextValue();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            if (token == "") {
                return;
            }
            const secret = new TextEncoder().encode(import.meta.env.VITE_TOKEN_SECRET);
            const { payload } = await jose.jwtVerify(token, secret);
            if (typeof(payload.userUsername) == "string") {
                setUsername(payload.userUsername);
            }
        }
        fetchUsername();
    }, [token]);

    return (
        <div className="navbar-group">
            <div className="link-border">
                <Link to="/"> Home </Link>
            </div>
            <div className="link-border">
                <Link to="../register"> Register </Link>
            </div>
            <div className="link-border">
                <Link to="../login"> Login </Link>
            </div>
            <div className="link-border">
                <Link to="../score"> Score </Link>
            </div>
            { token &&
                <Dropdown user={username} />
            }
        </div>
    );
}