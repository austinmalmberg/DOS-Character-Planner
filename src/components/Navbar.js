import logo from '../dosee-logo.png';

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand d-flex align-items-center" href="/">
                <img className="mr-4" src={logo} alt="DOS:EE" height="80px" />
                <h2>Character Planner</h2>
            </a>
        </nav>
    );
}

export default Navbar;
