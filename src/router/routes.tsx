import Home from ".";
import About from "./about";
import Profile from "./profile";
import NotFound from "./404";
import Login from "./loginPage/loginPage";
import { AuthenticationForm as Register } from "./registerPage/registerPage";
import Search from "./jelajah";
import PostDetail from "./detail";

export const appRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/about",
    component: <About />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/jelajah",
    component: <Search />,
  },
  {
    path: "/detail",
    component: <PostDetail />,
  },
];
