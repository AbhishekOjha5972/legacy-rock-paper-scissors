import React from "react";
import { Routes, Route } from "react-router-dom";
import Home_Page from "./Pages/Home";
import Room_Page from "./Pages/Room";
import Result_Page from "./Pages/Result";
import Game from "./Pages/Game";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/room" element={<Room_Page />} />
        <Route path="/result" element={<Result_Page />} />
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </>
  );
};

export default AllRoutes;
