import React from "react";

import {
  BrowserRouter as Router,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";

import ScrollToTop from "../helpers/ScrollToTop";
import Home from "../Components/Home/Home";


export default function AppRoutes(props) {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact={true} path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}
