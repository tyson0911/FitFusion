import React from 'react';
import SignIn from './components/SignIn';
import { useState, useEffect } from 'react';
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
    <Router>
      

      <Routes>
        <Route
                  path="/"
                  element={user ? <Navigate to="/profile" /> : <SignIn />}
                />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    
  );
}

export default App;