import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Trainers from "./components/Trainers";
import Plans from "./components/Plans";
import Gallery from "./components/Gallery";   
import Feedback from "./components/Feedback";   // ⭐ NEW IMPORT
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* MAIN WEBSITE */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Trainers />
              <Plans />

              <Gallery />     {/* ⭐ GALLERY SECTION */}
              <Feedback />    {/* ⭐ FEEDBACK SECTION */}

              <About />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* VERIFY OTP */}
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  );
}

export default App;