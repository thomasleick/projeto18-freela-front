import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import RedirectIfAuth from "./components/RedirectIfAuth";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Flights from "./routes/Flights";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Flight from "./routes/Flight";
import Hotels from "./routes/Hotels";
import Hotel from "./routes/Hotel";
import Finish from "./routes/Finish";

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Flights />} />
          <Route path="/flights/:id" element={<Flight />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/finish" element={<Finish />} />
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
