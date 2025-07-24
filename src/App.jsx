import React, { useState, useEffect } from 'react';
import Home from './pages/mysertifico/landing/Home';
import About from './pages/mysertifico/landing/About';
import Pricing from './pages/mysertifico/landing/Pricing';
import ContactUs from './pages/mysertifico/landing/ContactUs';
import PrivacyPolicy from './pages/mysertifico/landing/PrivacyPolicy';
import TermsOfService from './pages/mysertifico/landing/TermsOfService';
import SecurityPolicy from './pages/mysertifico/landing/SecurityPolicy';
import SignIn from './pages/mysertifico/auth/SignIn';
import SignUp from './pages/mysertifico/auth/SignUp';
import ForgotPassword from './pages/mysertifico/auth/ForgotPassword';
import Dashboard from './pages/mysertifico/admin/Dashboard';

// Define Tailwind CSS configuration directly within the component for simplicity
// In a real project, this would typically be in a tailwind.config.js file
// and compiled, but for a single-file React app in this environment,
// defining it here and letting the CDN script pick it up is the most direct way.
const tailwindConfig = `
  tailwind.config = {
    darkMode: 'class', // Enable dark mode based on class
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
        },
        colors: {
          primary: {
            DEFAULT: '#0d9488', // Teal-600
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            dark: '#0f766e', // Teal-700 for primary-dark
          },
          accent: {
            DEFAULT: '#f59e0b', // Amber-500
            hover: '#d97706', // Amber-600
          },
        },
      },
    },
  };
`;

function App() {
  // State to manage the current page, simulating routing
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to navigate between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Apply Tailwind config and handle dark mode on initial load
  useEffect(() => {
    // Inject Tailwind config script
    const script = document.createElement('script');
    script.innerHTML = tailwindConfig;
    document.head.appendChild(script);

    // Load Remix Icon CDN
    const remixIconLink = document.createElement('link');
    remixIconLink.href = "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css";
    remixIconLink.rel = "stylesheet";
    document.head.appendChild(remixIconLink);

    // Load Google Fonts
    const interLink = document.createElement('link');
    interLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@700&display=swap";
    interLink.rel = "stylesheet";
    document.head.appendChild(interLink);

    const preconnectGoogle = document.createElement('link');
    preconnectGoogle.rel = "preconnect";
    preconnectGoogle.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnectGoogle);

    const preconnectGstatic = document.createElement('link');
    preconnectGstatic.rel = "preconnect";
    preconnectGstatic.href = "https://fonts.gstatic.com";
    preconnectGstatic.crossOrigin = "true";
    document.head.appendChild(preconnectGstatic);

    // Dark mode initialization
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    // Clean up injected scripts/links on unmount if necessary
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(remixIconLink);
      document.head.removeChild(interLink);
      document.head.removeChild(preconnectGoogle);
      document.head.removeChild(preconnectGstatic);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  };

  // Render the current page based on the `currentPage` state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'about':
        return <About navigateTo={navigateTo} />;
      case 'pricing':
        return <Pricing navigateTo={navigateTo} />;
      case 'contact-us':
        return <ContactUs navigateTo={navigateTo} />;
      case 'privacy-policy':
        return <PrivacyPolicy navigateTo={navigateTo} />;
      case 'terms-of-service':
        return <TermsOfService navigateTo={navigateTo} />;
      case 'security-policy':
        return <SecurityPolicy navigateTo={navigateTo} />;
      case 'sign-in':
        return <SignIn navigateTo={navigateTo} />;
      case 'sign-up':
        return <SignUp navigateTo={navigateTo} />;
      case 'forgot-password':
        return <ForgotPassword navigateTo={navigateTo} />;
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
