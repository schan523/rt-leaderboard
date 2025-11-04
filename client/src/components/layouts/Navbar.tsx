import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

export const Navbar = () => {
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
        </div>
    );
}