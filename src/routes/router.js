import { Route } from "react-router-dom"
import Chat from "../Chats"
import Login from "../components/login"
import Register from "../components/register"
import AddFilms from "../pages/addFilms/addfilm"
import BXHUSER from "../pages/BXH/BXHuserLike"
import HOME from "../pages/home/home"
import SEARCH from "../pages/search/search"
import AllInfo from "../pages/showOnly/allInfo"
import YourStore from "../pages/yourProfile"

const PublicRouter = [
    { path: "/", component: HOME },
    { path: "/addfilms", component: AddFilms, Layout: null },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/search", component: SEARCH },
    { path: "/films/:id", component: AllInfo },
    { path: "/profile/:username", component: YourStore },
    { path: "/bxh", component: BXHUSER }
]

const adminRoutes = [
    { path: "/", component: HOME },
]


export { PublicRouter, adminRoutes }