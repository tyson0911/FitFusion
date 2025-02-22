import React from 'react';
import SignIn from './components/SignIn';
import { useState, useEffect } from 'react';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from './components/profile';
import { auth } from "./components/firebase";


function App() {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <>
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
    <Header />
    <Hero />
    <Benefits />
    <Collaboration />
    <Services />
    <Pricing />
    <Roadmap />
    <Footer />
  </div>

  <ButtonGradient />

    
      

      <Routes>
        {/* <Route
                  path="/"
                  element={user ? <Navigate to="/profile" /> : <SignIn />}
                /> */}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    
    </>
    
  );
}

export default App;