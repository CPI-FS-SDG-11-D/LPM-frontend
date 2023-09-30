import Home from ".";
import About from "./about";
import Profile from "./profile";
import NotFound from "./404";
import Login from "./loginPage/loginPage";


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
];
