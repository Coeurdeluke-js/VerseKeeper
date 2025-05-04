import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBook, FaLanguage, FaLightbulb } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.jsx';

const HomeContainer = styled.div`
  text-align: center;
  padding: 0;
  width: 100%;
`;

const Hero = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  margin-bottom: 0;
  background-color: var(--background-primary);
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  position: relative;
  z-index: 2;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 2;
  font-weight: 500;
`;

// Define HeroImage here, with other styled components
const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: #ffffff; /* Cambiado a blanco puro para mayor contraste */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9); /* Sombra más oscura */
  position: relative;
  z-index: 2;
  font-weight: bold; /* Añadido para mayor contraste */
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #f0f0f0; /* Cambiado a un tono más claro */
  max-width: 800px;
  margin: 0 auto 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9); /* Sombra más oscura */
  position: relative;
  z-index: 2;
  font-weight: 500; /* Añadido para mayor contraste */
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: var(--golden);
  color: var(--deep-navy);
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Sombra para el botón */
  
  &:hover {
    background-color: #c09c30;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    color: var(--accent-blue);
  }
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem;
  background-color: var(--background-primary);
`;

const FeatureCard = styled.div`
  background-color: var(--background-secondary);
  padding: 2rem;
  border-radius: 8px;
  max-width: 300px;
  box-shadow: 0 4px 6px var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px var(--shadow);
  }
  
  svg {
    font-size: 2.5rem;
    color: var(--golden);
    margin-bottom: 1rem;
  }
  
  h3 {
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
`;

const CardButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: var(--golden);
  color: var(--deep-navy);
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    background-color: #c09c30;
    transform: translateY(-2px);
  }
`;

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
  
  return (
    <HomeContainer>
      <Hero>
        {/* Descomenta esta línea y asegúrate de que la ruta sea correcta */}
        <HeroImage src="/hero.png" alt="VerseKeeper Hero" />
        <HeroTitle>VerseKeeper</HeroTitle>
        <HeroSubtitle>
          Tu compañero para estudiar y reflexionar sobre las escrituras
        </HeroSubtitle>
        <CTAButton to="/login">Comenzar Ahora</CTAButton>
      </Hero>
      
      <Features>
        <FeatureCard>
          <FaBook />
          <h3>Transcribe Versículos</h3>
          <p>Guarda tus versículos favoritos con su referencia exacta para consultarlos cuando lo necesites.</p>
          <CardButton onClick={handleCardClick}>Empezar</CardButton>
        </FeatureCard>
        
        <FeatureCard>
          <FaLanguage />
          <h3>Practica Traducción</h3>
          <p>Mejora tus habilidades lingüísticas traduciendo versículos al inglés y guardando tus traducciones.</p>
          <CardButton onClick={handleCardClick}>Explorar</CardButton>
        </FeatureCard>
        
        <FeatureCard>
          <FaLightbulb />
          <h3>Reflexiona y Aprende</h3>
          <p>Escribe tus reflexiones personales sobre cada versículo y profundiza en su significado.</p>
          <CardButton onClick={handleCardClick}>Descubrir</CardButton>
        </FeatureCard>
      </Features>
    </HomeContainer>
  );
};

export default Home;
