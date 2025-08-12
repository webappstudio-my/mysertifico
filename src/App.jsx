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
import SignIn from './pages/mysertifico/auth/SignIn';
import BoSignIn from './pages/bo/BoSignIn';
import ForgotPassword from './pages/mysertifico/auth/ForgotPassword';
import BoPasswordResetPage from './pages/bo/BoPasswordResetPage'; // Importing the Back Office Password Reset Page
import Dashboard from './pages/mysertifico/admin/Dashboard';
import BoDashboard from './pages/bo/BoDashboard'; // Adjusted import for BO Dashboard
import BoUsers from './pages/bo/BoUsers'; // Adjusted import for BO Users
import BoCertificates from './pages/bo/BoCertificates'; // Adjusted import for BO Certificates
import BoChangePassword from './pages/bo/BoChangePassword'; // Adjusted import for BO Change Password
import BoForgotPassword from './pages/bo/BoForgotPassword'; // Adjusted import for BO Forgot Password
import BoMyProfile from './pages/bo/BoMyProfile'; // Adjusted import for BO My Profile

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
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bo/dashboard" element={<BoDashboard />} />
        <Route path="/bo/admin/staff" element={<BoUsers />} />
        <Route path="/bo/certificates" element={<BoCertificates />} />
        <Route path="/bo/dashboard/change-password" element={<BoChangePassword />} />
        <Route path="/bo/forgot-password" element={<BoForgotPassword />} />
        <Route path='/bo/sign-in' element={<BoSignIn />} />
        <Route path="/bo/reset-password" element={<BoPasswordResetPage />} />
        <Route path="/bo/dashboard/my-profile" element={<BoMyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;