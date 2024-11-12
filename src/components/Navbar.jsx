import { Outlet } from "react-router-dom";
import Home from "../Pages/HomeUser";
import "./Navbar.css";
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
    User,
    UserPlus,
    Users,
    School,
    Presentation,
  } from "lucide-react"
function Navbar({ user }) {
    const avatarSrc = user && user.img ? user.img : '';  
    const rolUser = user && user.rol ? user.rol : "value"
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
                        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
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
                        <button className="button-index">Home</button>
                    </li>
                    <DropdownMenuSeparator className="separator"/>
                    <li className="presentation-item">
                        <Presentation/>
                        {rolUser=="docente" ? (
                            <button className="button-index">Mis Clases</button>
                        ) : (
                            <button className="button-index">Clases</button>
                        )}
                    </li>
                    <DropdownMenuSeparator className="separator"/>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="homeinfo">
                <Home />
            </div>
            <Outlet />
        </div>
    );
}

export default Navbar;
