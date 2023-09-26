import "./App.css";

import UtilityProvider from "./components/providers";
import { Routes, Route } from "react-router-dom";

import { appRoutes } from "./router/routes";

function App() {
  return (
    <UtilityProvider>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </UtilityProvider>
  );
}

export default App;
