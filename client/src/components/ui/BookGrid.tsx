import React from 'react';
import { motion } from 'framer-motion';
import { BookCard } from './BookCard'; // Ensure this path is correct relative to where I put BookGrid
import { staggerContainer, fadeInUp } from '../../theme/animations';

interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
}

interface BookGridProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', // Reduced min-width for mobile
    gap: '24px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }
};

export const BookGrid: React.FC<BookGridProps> = ({ books, onEdit, onDelete }) => {
  if (!books || books.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px', 
        color: 'var(--text-secondary)',
        border: '1px dashed rgba(255,255,255,0.1)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>No books found</h3>
        <p>Start by adding a new book to your library.</p>
      </div>
    );
  }

  return (
    <motion.div 
      style={styles.grid}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {books.map((book) => (
        <motion.div key={book.id} variants={fadeInUp}>
          <BookCard book={book} onEdit={onEdit} onDelete={onDelete} />
        </motion.div>
      ))}
    </motion.div>
  );
};
