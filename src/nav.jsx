import { Link } from "react-router-dom";

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1 className="logo">Recipe Tracker</h1>
            <div className="nav-links">
                <Link className="link" to="/"> Home</Link>
                <Link className="link" to="/dashboard"> Recipes</Link>
                <Link className="link" to="/about">About</Link>
                <Link className="link" to="/contacts">Contacts</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;