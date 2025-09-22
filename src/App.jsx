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
import TemplateList from './pages/mysertifico/admin/TemplateList';
import LogosBadges from './pages/mysertifico/admin/LogosBadges';
import AdminCertificateList from './pages/mysertifico/admin/AdminCertificateList';
import AdminViewCertificateBatch from './pages/mysertifico/admin/AdminViewCertificateBatch';
import AdminAccount from './pages/mysertifico/admin/AdminAccount';
import AdminAddRecipient from './pages/mysertifico/admin/AdminAddRecipient';
import AdminRecipientList from './pages/mysertifico/admin/AdminRecipientList';
import AdminCertificateRecipientBatch from './pages/mysertifico/admin/AdminCertificateRecipientBatch';
import OrganizationSettings from './pages/mysertifico/admin/OrganizationSettings';
import AdminImportRecipients from './pages/mysertifico/admin/AdminImportRecipients';
import AdminViewRecipient from './pages/mysertifico/admin/AdminViewRecipient';
import AdminUserList from './pages/mysertifico/admin/AdminUserList';
import AddNewUser from './pages/mysertifico/admin/AddNewUser';
import TopUpToken from './pages/mysertifico/admin/TopUpToken';
import LogoManagement from './pages/mysertifico/admin/LogoManagement';
import SelectedTemplateList from './pages/mysertifico/admin/SelectedTemplateList';
import AdminFindCertificate from './pages/mysertifico/admin/FindCertificate';
import EditUser from './pages/mysertifico/admin/EditUser';
import ViewUser from './pages/mysertifico/admin/ViewUser';
import ImportUsers from './pages/mysertifico/admin/ImportUsers';
import MyWallHome from './pages/mywall/landing/MyWallHome';
import MyWallAbout from './pages/mywall/landing/MyWallAbout';
import MyWallPrice from './pages/mywall/landing/MyWallPrice';
import MyWallContactUs from './pages/mywall/landing/MyWallContactUs';
import MWPrivacyPolicy from './pages/mywall/landing/MWPrivacyPolicy';
import MWSecurityPolicy from './pages/mywall/landing/MWSecurityPolicy';
import MWTermsOfService from './pages/mywall/landing/MWTermsOfService';
import MyWallSignUp from './pages/mywall/auth/MyWallSignUp';
import MWForgotPassword from './pages/mywall/auth/MWForgotPassword';
import MyWallSignIn from './pages/mywall/auth/MyWallSignIn';
import MyFamilyPage from './pages/mywall/parent/MyFamilyPage';
import ParentEditProfile from './pages/mywall/parent/ParentEditProfile';
import ParentMyProfile from './pages/mywall/parent/ParentMyProfile';
import ParentInvoicePage from './pages/mywall/parent/ParentInvoicePage';
import ParentMyAccount from './pages/mywall/parent/ParentMyAccount';
import StudentEditProfile from './pages/mywall/student/StudentEditProfile';


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
        {/* MySertifico Landing */}
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
        <Route path="/change-password" element={<ChangePassword theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/template-list" element={<TemplateList theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/logos-badges" element={<LogosBadges theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/admin/certificate-list" element={<AdminCertificateList theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/admin/view-certificate-batch/:id" element={<AdminViewCertificateBatch theme={theme} onThemeToggle={toggleTheme} />} />
         <Route path="/admin/find-certificate" element={<AdminFindCertificate theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/dashboard/settings/account" element={<AdminAccount theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/admin/add-recipient" element={<AdminAddRecipient theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/dashboard/settings/recipients" element={<AdminRecipientList theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/admin/certificate-recipient-batch" element={<AdminCertificateRecipientBatch theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/settings/organization-settings" element={<OrganizationSettings theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/admin/import-recipients" element={<AdminImportRecipients theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/admin/view-recipient/:id" element={<AdminViewRecipient theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/dashboard/settings/users" element={<AdminUserList theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/admin/add-new-user" element={<AddNewUser theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/topup-token" element={<TopUpToken theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/settings/logo-management" element={<LogoManagement theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/dashboard/settings/templates" element={<SelectedTemplateList theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/dashboard/settings/edit-user/:id" element={<EditUser theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/dashboard/settings/view-user/:id" element={<ViewUser theme={theme} onThemeToggle={toggleTheme} />} />
        <Route path="/dashboard/settings/import-users" element={<ImportUsers theme={theme} onThemeToggle={toggleTheme} />} />

        {/* MyWall Landing */}
        <Route path='/mywall/home' element={<MyWallHome />} />
        <Route path='/mywall/about' element={<MyWallAbout />} />
        <Route path='/mywall/pricing' element={<MyWallPrice />} />
        <Route path='/mywall/contact-us' element={<MyWallContactUs />} />
        <Route path="/mywall/privacy-policy" element={<MWPrivacyPolicy />} />
        <Route path="/mywall/security-policy" element={<MWSecurityPolicy />} />
        <Route path="/mywall/terms-of-service" element={<MWTermsOfService />} />

        {/* MyWall */}
        <Route path="/mywall/auth/forgot-password" element={<MWForgotPassword />} />
        <Route path='/mywall/auth/sign-up' element={<MyWallSignUp />} />
        <Route path='/mywall/auth/sign-in' element={<MyWallSignIn />} />
        <Route path='/mywall/parent-myfamily' element={<MyFamilyPage />} />
        <Route path='/mywall/parent-edit-profile' element={<ParentEditProfile />} />
        <Route path='/mywall/parent-myprofile' element={<ParentMyProfile />} />
        <Route path='/mywall/parent-invoice' element={<ParentInvoicePage />} />
        <Route path='/mywall/parent-myaccount' element={<ParentMyAccount />} />
        <Route path='/mywall/student-edit-profile' element={<StudentEditProfile />} />

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