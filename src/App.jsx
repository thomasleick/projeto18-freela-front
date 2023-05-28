import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import RedirectIfAuth from "./components/RedirectIfAuth";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Flight from "./routes/Flight";

export default function App() {
  return (
    <Routes>
       <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/flight/:id" element={<Flight />} />
          {/* 
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
          </Route>
          */}
          <Route element={<RedirectIfAuth />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route> 
        </Route>
      </Route>
    </Routes>
  );
}
