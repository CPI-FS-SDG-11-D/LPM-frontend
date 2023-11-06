import Home from ".";
import About from "./about";
import Profile from "./profile/profilePage";
import NotFound from "./404";
import Login from "./loginPage/loginPage";
import ChangePassword from "./changePassword/changePassword";
import { AuthenticationForm as Register } from "./registerPage/registerPage";
import Search from "./jelajah";
import PostDetail from "./detail";
import EditProfil from "./editProfile/editProfile"

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
    path: "/changePassword",
    component: <ChangePassword/>,
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
  {
    path: "/editprofil",
    component: <EditProfil />,
  },
];
