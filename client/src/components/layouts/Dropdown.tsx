import { useState } from 'react'; 

export const Dropdown = ({ user } : {user: string}) => {
    const [hideDropdown, setHideDropdown] = useState(true);

    const toggleDropdown = () => {
        setHideDropdown(!hideDropdown);
    }

    return (
    <div>
        <button onClick={toggleDropdown}> { user } </button>
        { !hideDropdown && 
            <div className="user-dropdown-container">
                <div> Profile </div>
                <div> Log out </div>
            </div> 
        }
    </div> 
);
}