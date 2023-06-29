import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    Algo Visualizer
                </div>
            </div>
            <div className="nav-btn">
                <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <ul className="nav-list">
                <li><a href="#">Sorting</a></li>
                <li><a href="#">Pathfinding</a></li>
                <li><a href="#">GitHub</a></li>
            </ul>
        </nav>
    )
}