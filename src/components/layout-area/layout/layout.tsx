import "./layout.css";
import { Header } from "../header/header";
import { Routing } from "../../routing/routing";
import { Menu } from "../menu/menu";

export function Layout() {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <nav>
                <Menu />
            </nav>
            <main>
                <Routing />
            </main>
        </div>
    );
}
