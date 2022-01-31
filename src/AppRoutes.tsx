import React from "react";
import Home from "./views/Home";
import DrugsList from "./components/features/drugsList/DrugsList";
import { Routes, Route } from "react-router-dom";
import NoMatch from "./views/NoMatch";
import DrugSetDetail from "./components/features/drugsetDetail/DrugSetDetail";

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="drugsets"></Route>
        <Route path="drugsets/:id" element={<DrugSetDetail/>}></Route>
        <Route path="drugsets/:id/drugs" element={<DrugsList/>}></Route>
        <Route element={<NoMatch/>}/>
      </Routes>
    </div>
  );
};