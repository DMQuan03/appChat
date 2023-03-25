import { Route } from "react-router-dom"
import Chat from "../Chats"
import Login from "../components/login"
import Register from "../components/register"
import AddFilms from "../pages/addFilms/addfilm"
import HOME from "../pages/home/home"
import AllInfo from "../pages/showOnly/allInfo"

const PublicRouter = [
    { path: "/", component: HOME },
    { path: "/addfilms", component: AddFilms, Layout: null },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/films/:id", component: AllInfo },
]

const adminRoutes = [
    { path: "/", component: HOME },
]


export { PublicRouter, adminRoutes }