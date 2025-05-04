import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSave, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { supabase } from '../supabase/supabaseClient';
import { AuthContext } from '../context/AuthContext.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0.8rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--golden);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const SaveButton = styled.button`
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
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    
    & > *:nth-child(5),
    & > *:nth-child(6),
    & > *:nth-child(7) {
      grid-column: span 2;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--background-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--golden);
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 120px;
  resize: vertical;
  background-color: var(--background-primary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--golden);
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: rgba(39, 174, 96, 0.1);
  border-radius: 4px;
`;

const VerseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [verse, setVerse] = useState({
    book: '',
    chapter: '',
    verse_number: '',
    original_text: '',
    translation: '',
    reflection: '',
    page_number: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchVerse = async () => {
      try {
        setLoading(true);
        setError(null);

        if (id === 'new') {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('verses')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          setVerse(data);
        } else {
          setError('No se encontró el versículo solicitado');
        }
      } catch (error) {
        console.error('Error al cargar el versículo:', error.message);
        setError('Error al cargar el versículo. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const verseData = {
        ...verse,
        user_id: user.id,
        updated_at: new Date()
      };
      
      if (id === 'new') {
        verseData.created_at = new Date();
        const { data, error } = await supabase
          .from('verses')
          .insert([verseData])
          .select();
          
        if (error) throw error;
        
        setSuccess('¡Versículo guardado con éxito!');
        navigate(`/verse/${data[0].id}`);
      } else {
        const { error } = await supabase
          .from('verses')
          .update(verseData)
          .eq('id', id)
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        setSuccess('¡Versículo actualizado con éxito!');
      }
    } catch (error) {
      console.error('Error al guardar el versículo:', error.message);
      setError('Error al guardar el versículo. Por favor, inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const [confirmDialog, setConfirmDialog] = useState({ 
    isOpen: false, 
    title: '', 
    message: '' 
  });

  const handleDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar Versículo',
      message: '¿Estás seguro de que deseas eliminar este versículo? Esta acción no se puede deshacer.',
      onConfirm: deleteVerse
    });
  };

  const deleteVerse = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('verses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al eliminar el versículo:', error.message);
      setError('Error al eliminar el versículo');
    } finally {
      setLoading(false);
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Verificar que el usuario esté autenticado
      if (!user || !user.id) {
        throw new Error('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
      }
      
      // Crear objeto con los datos del versículo
      const verseData = {
        book: verse.book,
        chapter: verse.chapter,
        verse_number: verse.verse_number,
        original_text: verse.original_text,
        translation: verse.translation,
        reflection: verse.reflection,
        page_number: verse.page_number,
        user_id: user.id, // Asegurarse de usar el ID correcto del usuario
      };
      
      // Imprimir para depuración
      console.log('Datos a guardar:', verseData);
      
      let response;
      
      if (id === 'new') {
        // Añadir fecha de creación para nuevos versículos
        verseData.created_at = new Date().toISOString();
        verseData.updated_at = new Date().toISOString();
        
        response = await supabase
          .from('verses')
          .insert([verseData])
          .select();
      } else {
        // Actualizar fecha de modificación
        verseData.updated_at = new Date().toISOString();
        
        response = await supabase
          .from('verses')
          .update(verseData)
          .eq('id', id)
          .select();
      }
      
      if (response.error) throw response.error;
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al guardar el versículo:', error.message);
      setError(`Error al guardar el versículo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DetailContainer>
        <p>Cargando...</p>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <Header>
        <BackButton onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> Volver
        </BackButton>
        <Title>{id === 'new' ? 'Nuevo Versículo' : 'Editar Versículo'}</Title>
        <ActionButtons>
          {id !== 'new' && (
            <DeleteButton onClick={handleDelete}>
              <FaTrash /> Eliminar
            </DeleteButton>
          )}
          <SaveButton onClick={handleSubmit} disabled={saving}>
            <FaSave /> {saving ? 'Guardando...' : 'Guardar'}
          </SaveButton>
        </ActionButtons>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="book">Libro</Label>
          <Input
            type="text"
            id="book"
            name="book"
            value={verse.book}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="chapter">Capítulo</Label>
          <Input
            type="number"
            id="chapter"
            name="chapter"
            value={verse.chapter}
            onChange={handleChange}
            required
            min="1"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="verse_number">Número de Versículo</Label>
          <Input
            type="number"
            id="verse_number"
            name="verse_number"
            value={verse.verse_number}
            onChange={handleChange}
            required
            min="1"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="page_number">Número de Página</Label>
          <Input
            type="number"
            id="page_number"
            name="page_number"
            value={verse.page_number}
            onChange={handleChange}
            min="1"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="original_text">Texto Original</Label>
          <Textarea
            id="original_text"
            name="original_text"
            value={verse.original_text}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="translation">Traducción al Inglés</Label>
          <Textarea
            id="translation"
            name="translation"
            value={verse.translation}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="reflection">Reflexión Personal</Label>
          <Textarea
            id="reflection"
            name="reflection"
            value={verse.reflection}
            onChange={handleChange}
          />
        </FormGroup>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
      <ConfirmDialog 
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={deleteVerse}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </DetailContainer>
  );
};

export default VerseDetail;