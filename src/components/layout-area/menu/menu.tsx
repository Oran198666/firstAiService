import { NavLink } from "react-router-dom";
import "./menu.css";

export function Menu() {
    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/aiSearch">AI Search</NavLink>
            <NavLink to="/recipe">Recipe</NavLink>
            <NavLink to="/employees">Employees</NavLink>
        </div>
    );
}
