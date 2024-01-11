import { createRoot } from "react-dom/client";
import Community from "./components/Community/Community";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/login/login";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/c/:name" element={<Community />} />
      <Route path="/search" element={<Search />} />

      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<SignIn />} />

    </Routes>
  </BrowserRouter>
);
