import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
