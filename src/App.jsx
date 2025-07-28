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
// Import other pages as you create them

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
        {/* Add routes for /about, /price, /contact-us, /auth/sign-in, /auth/sign-up etc. */}
        {/* Example: */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/auth/sign-in" element={<SignInPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;