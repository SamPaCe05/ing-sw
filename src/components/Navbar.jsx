import { Outlet } from "react-router-dom";
import Home from "../Pages/HomeUser";
import "./Navbar.css";
import { AddProblem } from "./AddProblem";
import MisClases from "./MisClases"
import { useNavigate, useLocation } from "react-router-dom";
import { CreateClass } from "@/components/CreateClass";
import { Addstudent } from "./Addstudent";
import Clases from "./Clases"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
    UserRoundPlus,
    BadgePlus,
    House,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    ChartLine,
    User,
    UserPlus,
    Users,
    School,
    Presentation,
  } from "lucide-react"
function Navbar({ user }) {
    const navigate = useNavigate();
    const username = user && user.username ? user.username : "user";
    const location = useLocation();
    const avatarSrc = user && user.img ? user.img : '';  
    const rolUser = user && user.rol ? user.rol : "value"
    console.log(location)
    return (
        <div className="navbar-container">
            <div className="Navbar">
                <img className="logo" src="/src/img/logo.png" alt="" />
                <h2 className="title-navbar">CodeAMZ</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="open-drop">
                        <button className="boton-open" variant="outline">
                            <img className="open-listado" src="/src/img/listado.png" alt="" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Hola, {username}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User />
                                <span>Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings />
                                <span>Configuracion</span>
                            </DropdownMenuItem>
                            
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <LogOut/>
                                <span>Cerrar sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Avatar className="Avatar">
                    <AvatarImage src={avatarSrc} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            
            <div className="index">
            <DropdownMenuSeparator className="separator"/>
                <ul>
                    <li className="presentation-item">
                        <House/>
                        <button 
                        onClick={() => navigate("/home")}
                        className="button-index">
                            Home
                        </button>
                    </li>
                    <DropdownMenuSeparator className="separator"/>
                    <li className="presentation-item">
                        <Presentation/>
                        {rolUser=="docente" ? (
                            <button className="button-index" onClick={()=> navigate("/home/misclases")}>Mis Clases</button>
                        ) : (
                            <button onClick={()=>navigate("/home/clases")} className="button-index">Clases</button>
                        )}
                    </li>
                    <DropdownMenuSeparator className="separator"/>
                    {rolUser=="docente" && (
                        <DropdownMenuLabel className="tcst">Opciones De Profesor</DropdownMenuLabel>
                    )}
                    {rolUser=="user" && (
                        <DropdownMenuLabel className="tcst">Opciones De Estudiante</DropdownMenuLabel>
                    )}
                    {rolUser=="user"&&(
                        <li className="presentation-item">
                            <ChartLine />
                            <button className="button-index"> VIEW STATS</button>
                        </li>
                    )} 
                    {rolUser === "docente" && (
                        
                        <li className="presentation-item">
                            <BadgePlus />
                            <button 
                            onClick={()=> navigate("/home/addproblem")}
                            className="button-index">
                                ADD PROBLEM
                            </button>
                        </li>
                    )}
                     {rolUser === "docente" && (
                        
                        <li className="presentation-item">
                            <UserRoundPlus />
                            <button 
                            onClick={()=> navigate("/home/addstudent")}
                            className="button-index">
                                ADD STUDENT
                            </button>
                        </li>
                    )}
                    {rolUser === "docente" && (
                        
                        <li className="presentation-item">
                            <BadgePlus />
                            <button
                            className="button-index"
                            onClick={() => navigate("/home/createclass")}
                            >
                            CREATE CLASS
                           </button>

                        </li>
                    )}
                    <DropdownMenuSeparator className="separator"/>

                    <li></li>
                </ul>
            </div>
                {location.pathname=="/home" &&(
                    <Home/>
                )}
                {location.pathname=="/home/createclass" &&(
                    <div className="createClass">
                        <CreateClass userDetails={user}/>
                    </div>
                )}
                {location.pathname=="/home/misclases" &&(
                    <div className="misclases">
                        <MisClases user={user}/>
                    </div>
                )}
                {location.pathname=="/home/addproblem" &&(
                    <div className="addproblem">
                        <AddProblem userDetails={user}/>
                    </div>
                )}
                {location.pathname=="/home/addstudent" &&(
                    <div className="addproblem">
                        <Addstudent userDetails={user}/>
                    </div>
                )}
                {location.pathname=="/home/clases" &&(
                    <div className="misclases">
                        <Clases user={user}/>
                    </div>
                )}
            <Outlet />
        </div>
    );
}

export default Navbar;
