// export default App;
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/mysertifico/landing/Home';
import About from './pages/mysertifico/landing/About';
import Price from './pages/mysertifico/landing/Price';
import ContactUs from './pages/mysertifico/landing/ContactUs';
import PrivacyPolicy from './pages/mysertifico/landing/PrivacyPolicy';
import TermsOfService from './pages/mysertifico/landing/TermsOfService';
import SecurityPolicy from './pages/mysertifico/landing/SecurityPolicy';
import SignUp from './pages/mysertifico/auth/SignUp';
import SignIn from './pages/mysertifico/auth/SignIn'; {/* Need to remove this import as it conflicts with the BoSignIn component */}
import BoSignIn from './pages/bo/BoSignIn';
import ForgotPassword from './pages/mysertifico/auth/ForgotPassword';
import Dashboard from './pages/mysertifico/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/price" element={<Price />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path='/bo/sign-in' element={<BoSignIn />} /> {/* Back Office Sign In */}
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;