import Home from ".";
import About from "./about";
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
    path: "/login",
    component: <Login />,
  },
];
