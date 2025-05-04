import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0a1b2a; /* Deep Navy Blue */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${props => props.$stage === 'hidden' ? 0 : 1};
  visibility: ${props => props.$stage === 'hidden' ? 'hidden' : 'visible'};
  transition: opacity 0.8s ease, visibility 0.8s ease;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.$stage === 'logo-visible' ? 1 : 0};
  transform: scale(${props => props.$stage === 'logo-visible' ? 1 : 0.8});
  transition: opacity 1s ease, transform 1s ease;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
  
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SplashScreen = () => {
  const [stage, setStage] = useState('initial');
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    // Verificar si es una recarga de página o navegación directa
    const isPageReload = performance.navigation ? 
      performance.navigation.type === 1 : 
      window.performance.getEntriesByType('navigation')[0].type === 'reload';
    
    // Verificar si es la primera visita en esta sesión
    const isFirstVisit = !sessionStorage.getItem('hasVisitedBefore');
    
    // Mostrar splash screen solo en recarga o primera visita
    if (isPageReload || isFirstVisit) {
      setShouldShow(true);
      
      // Marcar que ya ha visitado
      sessionStorage.setItem('hasVisitedBefore', 'true');
      
      // Secuencia de animación
      setTimeout(() => {
        setStage('logo-visible');
        
        setTimeout(() => {
          setStage('logo-hidden');
          
          setTimeout(() => {
            setStage('hidden');
          }, 800); // Tiempo para fade out del fondo
        }, 2000); // Tiempo que el logo permanece visible
      }, 500); // Tiempo antes de mostrar el logo
    } else {
      setStage('hidden');
    }
  }, []);
  
  if (!shouldShow) return null;
  
  return (
    <SplashContainer $stage={stage}>
      <LogoContainer $stage={stage}>
        <Logo src="/logo.png" alt="VerseKeeper Logo" />
      </LogoContainer>
    </SplashContainer>
  );
};

export default SplashScreen;