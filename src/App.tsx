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
      <footer className="py-4">
        <div className="flex justify-center">
          <p className="text-gray-600">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/CPI-FS-SDG-11-D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Team SDG 11-D
            </a>
          </p>
        </div>
      </footer>
    </UtilityProvider>
  );
}

export default App;
