import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSun, FaMoon, FaSignOutAlt, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const HeaderContainer = styled.header`
  background-color: var(--background-secondary);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px var(--shadow);
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
  max-width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    margin-right: 10px;
  }
  
  h1 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin: 0;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-bottom: ${props => props.$isOpen ? '1rem' : '0'};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  a {
    color: ${props => props.theme === 'dark' ? 'var(--golden)' : 'inherit'};
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme === 'dark' ? '#c09c30' : 'var(--golden)'};
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    padding-top: 1rem;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? 'var(--golden)' : 'var(--text-primary)'};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--shadow);
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? 'var(--golden)' : 'var(--text-primary)'};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? 'var(--golden)' : 'var(--text-primary)'};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--golden);
  }
`;

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo $isOpen={isMenuOpen}>
          <img src="/logo.png" alt="VerseKeeper Logo" />
          <h1>VerseKeeper</h1>
          <MenuButton onClick={toggleMenu} theme={theme}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </MenuButton>
        </Logo>
        
        <NavLinks $isOpen={isMenuOpen} theme={theme}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Mis Versículos</Link>
              <LogoutButton onClick={handleSignOut} theme={theme}>
                <FaSignOutAlt />
                <span>Cerrar Sesión</span>
              </LogoutButton>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>
          )}
          
          <ThemeToggle onClick={toggleTheme} title="Cambiar tema" theme={theme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </ThemeToggle>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;