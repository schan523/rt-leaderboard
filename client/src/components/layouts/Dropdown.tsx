import { useState } from 'react'; 
import { useNavigate } from 'react-router';
import { authContextValue } from '../../context/AuthContext';

export const Dropdown = ({ user } : {user: string}) => {
    const [hideDropdown, setHideDropdown] = useState(true);
    const navigate = useNavigate();
    const { setToken } = authContextValue();

    const toggleDropdown = () => {
        setHideDropdown(!hideDropdown);
    }

    const logout = () => {
        setToken("");
        navigate("/", { replace: true });
    }

    return (
    <div className="user-dropdown-container">
        <button onClick={toggleDropdown}> { user } </button>
        { !hideDropdown && 
            <div className="user-dropdown-items">
                <div>
                    <button onClick={() => {navigate("/profile", { replace: true })}}> Profile </button>  
                </div>
                <div>
                    <button onClick={logout}> Log out</button> 
                </div>
            </div> 
        }
    </div> 
);
}