"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
var providers_1 = require("./components/providers");
var react_router_dom_1 = require("react-router-dom");
var routes_1 = require("./router/routes");
function App() {
    return (<providers_1.default>
      <react_router_dom_1.Routes>
        {routes_1.appRoutes.map(function (route, index) { return (<react_router_dom_1.Route key={index} path={route.path} element={route.component}/>); })}
      </react_router_dom_1.Routes>
    </providers_1.default>);
}
exports.default = App;
