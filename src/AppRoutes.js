import React from "react";
import Home from "./Views/Home";
import DrugsList from "./Components/DrugsList";
import { Routes, Route, Navigate } from "react-router-dom";
import NoMatch from "./Views/NoMatch";
import DrugSetDetail from "./Components/DrugSetDetail";

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