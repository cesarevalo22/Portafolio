import React from "react";

import {
  BrowserRouter as Router,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";

import ScrollToTop from "../helpers/ScrollToTop";
import { paths } from "../Config/ConfigPaths";
import Home from "../Components/Home/Home";
import AboutMe from "../Components/AboutMe/aboutMe";
import Documents from "../Components/Documents/documents"
import FrontEnd from "../Components/FrontEnd/frontEnd";
import BackEnd from "../Components/BackEnd/BackEnd"



export default function AppRoutes(props) {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact={true} path={paths.home} element={<Home/>} />
        <Route exact={true} path={paths.aboutMe} element={<AboutMe/>} />
        <Route exact={true} path={paths.frontEnd} element={<FrontEnd/>} />
        <Route exact={true} path={paths.backEnd} element={<BackEnd/>} />
        <Route exact={true} path={paths.documents} element={<Documents/>} />


      </Routes>
    </Router>
  );
}
