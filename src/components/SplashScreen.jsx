import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0A1B2A; /* Deep Navy Blue */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${props => props.$isClosing ? 0 : 1};
  transition: opacity 1s ease-in-out;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 350px; /* Logo más grande */
  opacity: ${props => props.$phase === 'visible' ? 1 : 0};
  transition: opacity 1.5s ease-in-out;
`;

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [logoPhase, setLogoPhase] = useState('hidden'); // 'hidden', 'visible', 'fadeout'
  
  useEffect(() => {
    // Mostrar el logo después de un breve retraso
    const timer1 = setTimeout(() => {
      setLogoPhase('visible');
      
      // Iniciar el desvanecimiento del logo
      const timer2 = setTimeout(() => {
        setLogoPhase('hidden');
        
        // Iniciar el desvanecimiento del fondo después de que el logo se desvanezca
        const timer3 = setTimeout(() => {
          setIsClosing(true);
          
          // Ocultar completamente después de la animación
          const timer4 = setTimeout(() => {
            setIsVisible(false);
          }, 1000);
          
        }, 1500);
        
      }, 2000);
      
    }, 500);
    
    // Limpiar todos los timeouts si el componente se desmonta
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <SplashContainer $isClosing={isClosing}>
      <LogoContainer>
        <Logo src="/logo.png" alt="VerseKeeper Logo" $phase={logoPhase} />
      </LogoContainer>
    </SplashContainer>
  );
};

export default SplashScreen;