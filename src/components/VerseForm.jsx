import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSave, FaTimes } from 'react-icons/fa';

const FormContainer = styled.form`
  background-color: var(--background-secondary);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px var(--shadow);
`;

const FormTitle = styled.h2`
  color: var(--golden);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--text-secondary);
  border-radius: 4px;
  background-color: var(--background-primary);
  color: var(--text-primary);
  font-family: 'Trajan Pro', serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--golden);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--text-secondary);
  border-radius: 4px;
  background-color: var(--background-primary);
  color: var(--text-primary);
  font-family: 'Trajan Pro', serif;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--golden);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SaveButton = styled(Button)`
  background-color: var(--deep-navy);
  color: var(--warm-white);
  
  &:hover {
    background-color: var(--golden);
    color: var(--deep-navy);
  }
  
  [data-theme='dark'] & {
    background-color: var(--golden);
    color: var(--deep-navy);
    
    &:hover {
      background-color: var(--warm-white);
    }
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--text-secondary);
  
  &:hover {
    background-color: var(--text-secondary);
    color: var(--background-primary);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VerseForm = ({ verse, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    book: '',
    chapter: '',
    verse: '',
    page: '',
    original_text: '',
    english_translation: '',
    reflection: ''
  });

  useEffect(() => {
    if (verse) {
      setFormData(verse);
    }
  }, [verse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{verse ? 'Editar Versículo' : 'Nuevo Versículo'}</FormTitle>
      
      <Row>
        <FormGroup>
          <Label htmlFor="book">Libro</Label>
          <Input
            type="text"
            id="book"
            name="book"
            value={formData.book}
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
            value={formData.chapter}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="verse">Versículo</Label>
          <Input
            type="number"
            id="verse"
            name="verse"
            value={formData.verse}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </Row>
      
      <FormGroup>
        <Label htmlFor="page">Página</Label>
        <Input
          type="number"
          id="page"
          name="page"
          value={formData.page}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="original_text">Texto Original</Label>
        <Textarea
          id="original_text"
          name="original_text"
          value={formData.original_text}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="original_text">Texto Original</Label>
        <Textarea
          id="original_text"
          name="original_text"
          value={formData.original_text}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="english_translation">Traducción al Inglés</Label>
        <Textarea
          id="english_translation"
          name="english_translation"
          value={formData.english_translation}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="reflection">Reflexión</Label>
        <Textarea
          id="reflection"
          name="reflection"
          value={formData.reflection}
          onChange={handleChange}
        />
      </FormGroup>
      
      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel}>
          <FaTimes /> Cancelar
        </CancelButton>
        <SaveButton type="submit">
          <FaSave /> Guardar
        </SaveButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default VerseForm;