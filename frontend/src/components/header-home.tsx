import { Link } from "react-router-dom";
import { Input } from "./ui/input";

export function Header(){
    return(
<div
    className="sticky top-0 z-50 w-full border-b border-border-color bg-surface-light/80 backdrop-blur-md px-4 md:px-8 py-3">
    <div className="flex justify-end space-x-2">
         <Link to="/Login" className="p-3 border-2 rounded-xl hover:text-red-500">Connexion</Link>
         <Link to="/Register" className="p-3 border-2 rounded-xl hover:text-red-500">S'inscrire</Link>
    </div>
   
   </div>
)
}