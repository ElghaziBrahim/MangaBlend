import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />

    </Routes>
  </BrowserRouter>
);
