import { Routes,Route, Navigate } from "react-router-dom";
import { Home } from "../page-area/home/home";
import { PageNotFound } from "../page-area/page-not-found/page-not-found";
import { Spinner } from "../page-area/spinner/spinner";
import { lazy, Suspense } from "react";


const Recipe = lazy (()=>import("../page-area/recipe/recipe").then(r =>({default:r.Recipe})));
const AiSearch = lazy (()=> import("../page-area/ai-search/ai-search").then( m=>({default:m.AiSearch})));
const Employees = lazy (()=> import("../page-area/employees/employees").then(e =>({default:e.Employees})));

export function Routing() {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/aiSearch" element={<Suspense fallback={<Spinner />}><AiSearch /></Suspense>} />
                <Route path="/home" element={<Home />} />
                <Route path="/recipe" element={<Recipe />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path = "/employees" element={<Suspense fallback={<Spinner/>}><Employees /></Suspense>} />
            </Routes>
        </div>
    );
}
