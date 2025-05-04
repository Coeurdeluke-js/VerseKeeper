import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { supabase } from '../supabase/supabaseClient';
import { AuthContext } from '../context/AuthContext.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

const DashboardContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 80px);
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: var(--golden);
  color: var(--deep-navy);
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c09c30;
    transform: translateY(-2px);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background-color: var(--background-secondary);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px var(--shadow);
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  svg {
    color: var(--text-secondary);
    margin-right: 0.5rem;
  }
  
  input {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-size: 1rem;
    padding: 0.5rem;
    
    &:focus {
      outline: none;
    }
  }
`;

const VerseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const VerseCard = styled.div`
  background-color: var(--background-secondary);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px var(--shadow);
  }
`;

const VerseReference = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--golden);
  word-break: break-word;
`;

const VerseText = styled.p`
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: auto;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  
  &:hover {
    color: var(--golden);
    background-color: rgba(212, 175, 55, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--background-secondary);
  border-radius: 8px;
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
`;

const WelcomeMessage = styled.div`
  color: var(--golden);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Dashboard = () => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, verseId: null });
  
  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const { data, error } = await supabase
          .from('verses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setVerses(data || []);
      } catch (error) {
        console.error('Error al obtener versículos:', error.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchVerses();
    }
  }, [user]);
  
  const handleDelete = (verseId) => {
    setConfirmDialog({
      isOpen: true,
      verseId: verseId,
      message: '¿Estás seguro de que deseas eliminar este versículo?'
    });
  };
  
  const confirmDelete = async () => {
    try {
      const { error } = await supabase
        .from('verses')
        .delete()
        .eq('id', confirmDialog.verseId);
      
      if (error) throw error;
      
      // Actualizar la lista de versículos
      setVerses(verses.filter(verse => verse.id !== confirmDialog.verseId));
      
      // Cerrar el diálogo
      setConfirmDialog({ isOpen: false, verseId: null });
    } catch (error) {
      console.error('Error al eliminar el versículo:', error.message);
    }
  };
  
  // Corregir el error de toLowerCase() verificando que cada propiedad existe antes de llamar a toLowerCase()
  const filteredVerses = verses.filter(verse => 
    (verse.reference && verse.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (verse.original_text && verse.original_text.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (verse.translation && verse.translation.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (verse.reflection && verse.reflection.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  if (loading) {
    return <div>Cargando versículos...</div>;
  }
  
  return (
    <DashboardContainer>
      <Header>
        <Title>Mis Versículos</Title>
        <AddButton as={Link} to="/verse/new">
          <FaPlus /> Añadir Versículo
        </AddButton>
      </Header>
      
      <WelcomeMessage>
        Hola {user.email}
      </WelcomeMessage>
      
      <SearchBar>
        <FaSearch />
        <input 
          type="text" 
          placeholder="Buscar versículos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      
      {/* Eliminar cualquier otro botón "Añadir Versículo" que pueda estar aquí */}
      
      {loading ? (
        <LoadingMessage>Cargando versículos...</LoadingMessage>
      ) : verses.length === 0 ? (
        <EmptyState>
          <p>No tienes versículos guardados.</p>
          {/* No repetir el botón aquí, ya está en el encabezado */}
        </EmptyState>
      ) : (
        <VerseGrid>
          {filteredVerses.map(verse => (
            <VerseCard key={verse.id}>
              <VerseReference>
                {verse.book} {verse.chapter}:{verse.verse_number}
              </VerseReference>
              <VerseText>{verse.original_text}</VerseText>
              <CardActions>
                <Link to={`/verse/${verse.id}`}>
                  <ActionButton title="Editar">
                    <FaEdit />
                  </ActionButton>
                </Link>
                <ActionButton 
                  onClick={() => handleDelete(verse.id)}
                  title="Eliminar"
                >
                  <FaTrash />
                </ActionButton>
              </CardActions>
            </VerseCard>
          ))}
        </VerseGrid>
      )}
      
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </DashboardContainer>
  );
};

export default Dashboard;