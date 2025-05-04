import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.jsx';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px); // Corregido de 80x a 80px
  padding: 2rem;
  z-index: 1;
  
  max-width: 500px;
  margin: 4rem auto;
  padding: 8rem;
  background-color: var(--background-secondary);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
`;

const Logo = styled.img`
  width: 200px;  /* Aumentado para que sea más grande */
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-family: 'Trajan Pro', serif;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.8rem;
  background-color: var(--accent-color);
  color: var(--background-primary);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #c09c30;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const Spinner = styled.div`
  display: inline-block;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
`;

const Login = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, loading } = useContext(AuthContext);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
      setError('No se pudo iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <LoginPageContainer>
      <LoginContainer>
        <Logo src="/logo.png" alt="VerseKeeper Logo" style={{ width: "200px" }} />
        {/* Se eliminan los textos redundantes */}
        
        <GoogleButton onClick={handleGoogleSignIn} disabled={loading}>
          {loading ? (
            <Spinner><FaSpinner /></Spinner>
          ) : (
            <FaGoogle />
          )}
          Continuar con Google
        </GoogleButton>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default Login;