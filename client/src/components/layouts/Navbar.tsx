import { useEffect, useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from './Dropdown';
import '../../styles/Navbar.css';

const store = {
    getSnapshot: () => localStorage.getItem("username"),
    subscribe: (listener: () => void) => {
        document.addEventListener("storage", listener);
        return () => document.removeEventListener("storage", listener);
    }
};

export const Navbar = () => {
    // useEffect(() => {
    //     const fetchUsername = async () => {
    //         if (!localStorage.getItem("username")) {
    //             setUsername(null);
    //             return;
    //         }
    //         setUsername(localStorage.getItem("username"));
    //     }
    //     fetchUsername();
    // }, [localStorage.getItem("username")]);


    const userName = useSyncExternalStore(store.subscribe, store.getSnapshot);

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
            { userName &&
                <Dropdown user={userName} />
            }
        </div>
    );
}