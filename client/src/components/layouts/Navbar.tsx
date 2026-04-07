import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContextValue } from '../../context/authContext';
import { Dropdown } from './Dropdown';
import '../../styles/Navbar.css';

export const Navbar = () => {
    const { token } = authContextValue();
    const [username, setUsername] = useState(null);

    console.log("username is:", localStorage.getItem("username"));
    let usern = localStorage.getItem("username") || "";

    useEffect(() => {
        const fetchUsername = async () => {
            if (!localStorage.getItem("username")) {
                setUsername(null);
                return;
            }
            setUsername(localStorage.getItem("username"));
        }
        fetchUsername();
    }, [localStorage.getItem("username")]);

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
            <div className="link-border">
                <Link to="../leaderboard"> Leaderboard </Link>
            </div>
            { username &&
                <Dropdown user={usern} />
            }
        </div>
    );
}