import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Card = styled.div`
  background-color: var(--background-secondary);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px var(--shadow);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px var(--shadow);
  }
`;

const VerseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--golden);
  padding-bottom: 0.5rem;
`;

const VerseReference = styled.h3`
  color: var(--golden);
  font-size: 1.2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--golden);
  }
`;

const VerseSection = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`;

const VerseText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const VerseCard = ({ verse, onEdit, onDelete }) => {
  return (
    <Card>
      <VerseHeader>
        <VerseReference>
          {verse.book} {verse.chapter}:{verse.verse} (Página {verse.page})
        </VerseReference>
        <ActionButtons>
          <IconButton onClick={() => onEdit(verse.id)} aria-label="Editar">
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => onDelete(verse.id)} aria-label="Eliminar">
            <FaTrash />
          </IconButton>
        </ActionButtons>
      </VerseHeader>
      
      <VerseSection>
        <SectionTitle>Versículo Original:</SectionTitle>
        <VerseText>{verse.original_text}</VerseText>
      </VerseSection>
      
      <VerseSection>
        <SectionTitle>Traducción al Inglés:</SectionTitle>
        <VerseText>{verse.english_translation}</VerseText>
      </VerseSection>
      
      <VerseSection>
        <SectionTitle>Reflexión:</SectionTitle>
        <VerseText>{verse.reflection}</VerseText>
      </VerseSection>
    </Card>
  );
};

export default VerseCard;