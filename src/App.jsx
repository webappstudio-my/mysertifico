// export default App;
// src/App.jsx
import { useState, useEffect } from 'react';
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
import BoTemplateManagement from './pages/bo/BoTemplates'; // Adjusted import for BO Template Management
import BoLogosBadges from './pages/bo/BoLogosBadges';
import BoOrganizationUsers from './pages/bo/BoOrganizationUsers';
import BoMyWallUsers from './pages/bo/BoMyWallUsers'; // Adjusted import for BO My Wall Users
import BoOrganizations from './pages/bo/BoOrganizations'; // Adjusted import for BO Organizations
import BoMyWallPlans from './pages/bo/BoMyWallPlans';
import BoSupportHelp from './pages/bo/BoSupportHelp';
import CreateTemplate from './pages/bo/CreateTemplate';
import BoMySertificoPlans from './pages/bo/BoMySertificoPlans'; // Adjusted import for BO My Sertifico Plans
import MyProfile from './pages/mysertifico/admin/MyProfile';
import ChangePassword from './pages/mysertifico/admin/ChangePassword';
import BoCertificateList from './pages/bo/BoCertificateList';
import BoViewCertificateBatch from './pages/bo/BoViewCertificateBatch';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/price" element={<Price />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />

        {/* MySertifico */}
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/my-profile" element={<MyProfile theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/change-password" element={<ChangePassword theme={theme} onThemeToggle={toggleTheme} />} />"
        <Route path="/admin/certificate-list" element={<BoCertificateList />} />
        <Route path="/admin/view-certificate-batch/:id" element={<BoViewCertificateBatch />} />

        {/* MyWall */}

        {/* Back Office */}
        <Route path="/bo/dashboard" element={<BoDashboard />} />
        <Route path="/bo/admin/staff" element={<BoUsers />} />
        <Route path="/bo/certificates" element={<BoCertificates />} />
        <Route path="/bo/change-password" element={<BoChangePassword />} />
        <Route path="/bo/forgot-password" element={<BoForgotPassword />} />
        <Route path='/bo/sign-in' element={<BoSignIn />} />
        <Route path="/bo/reset-password" element={<BoPasswordResetPage />} />
        <Route path="/bo/my-profile" element={<BoMyProfile />} />
        <Route path="/bo/templates" element={<BoTemplateManagement />} />
        <Route path="/bo/logos-badges" element={<BoLogosBadges />} />
        <Route path="/bo/users/organization-users" element={<BoOrganizationUsers />} />
        <Route path="/bo/users/mywall-users" element={<BoMyWallUsers />} />
        <Route path="/bo/users/organizations" element={<BoOrganizations />} />
        <Route path="/bo/admin/mywall-plans" element={<BoMyWallPlans />} />
        <Route path="/bo/admin/support-help" element={<BoSupportHelp />} />
        <Route path="/bo/templates/create-template" element={<CreateTemplate />} />
        <Route path="/bo/admin/mysertifico-plans" element={<BoMySertificoPlans />} />
      </Routes>
    </Router>
  );
}

export default App;