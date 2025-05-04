import React, { useState, useEffect, useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import GlobalStyles from './styles/GlobalStyles.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VerseDetail from './pages/VerseDetail.jsx';
import AuthCallback from './components/AuthCallback.jsx';
import './App.css';
import SplashScreen from './components/SplashScreen.jsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Agregar esta línea
function AppContent() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const nodeRef = useRef(null);
  
  return (
    <>
      <SplashScreen />
      <GlobalStyles />
      <Header />
      
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="page"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef} className="page">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/verse/:id" 
                element={
                  <ProtectedRoute>
                    <VerseDetail />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
