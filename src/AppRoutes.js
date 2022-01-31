import React from "react";
import Home from "./Views/Home";
import DrugsList from "./Components/Features/DrugsList/DrugsList";
import { Routes, Route } from "react-router-dom";
import NoMatch from "./Views/NoMatch";
import DrugSetDetail from "./Components/Features/DrugSetDetail/DrugSetDetail";

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="drugsets"></Route>
        <Route path="drugsets/:id" element={<DrugSetDetail/>}></Route>
        <Route path="drugsets/:id/drugs" element={<DrugsList/>}></Route>
        <Route element={<NoMatch/>}/>
      </Routes>
    </div>
  );
};