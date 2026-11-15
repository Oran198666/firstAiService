import { NavLink } from "react-router-dom";
import "./page-not-found.css"

export function PageNotFound() {
    return (
        <div className="PageNotfound">
            <h1>404</h1>
            <p>The page you are looking for doesn't exist.</p>
            <NavLink to="/home">Back to Home</NavLink>
        </div>
    );
}