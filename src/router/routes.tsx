import Home from ".";
import About from "./about";

export const appRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/about",
    component: <About />,
  },
];
