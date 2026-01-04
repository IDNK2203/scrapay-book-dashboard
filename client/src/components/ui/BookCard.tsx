import React from 'react';
import { motion } from 'framer-motion';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import { revealVar } from '../../theme/animations';

interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
}

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const styles = {
  card: {
    background: 'var(--bg-surface)',
    borderRadius: 'var(--radius-md)',
    padding: '24px',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    minHeight: '200px',
    border: '1px solid transparent',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  info: {
    zIndex: 2,
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    lineHeight: 1.3,
  },
  author: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    gap: '8px',
    marginTop: '20px',
    zIndex: 3,
  },
  iconButton: {
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    transition: 'background 0.2s',
  },
  glow: {
    position: 'absolute' as const,
    bottom: '-50px',
    right: '-50px',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
    opacity: 0.5,
    pointerEvents: 'none' as const,
    zIndex: 1,
  }
};

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <motion.div 
      style={styles.card}
      whileHover={{ 
        scale: 1.02, 
        borderColor: 'var(--accent-primary)',
        boxShadow: 'var(--shadow-glow)'
      }}
      initial="initial"
      whileTap={{ scale: 0.98 }}
    >
      <div style={styles.info}>
        <div style={styles.title}>{book.title}</div>
        <div style={styles.author}>{book.author}</div>
      </div>
      
      <motion.div 
        style={styles.actions} 
        variants={revealVar} // Inherits "hover" state from parent
      >
        <button 
          style={styles.iconButton}
          onClick={(e) => { e.stopPropagation(); onEdit(book); }}
          title="Edit"
        >
          <LuPencil size={18} />
        </button>
        <button 
          style={{ ...styles.iconButton, color: '#ff4444' }} // Local override for delete
          onClick={(e) => { e.stopPropagation(); onDelete(book.id); }}
          title="Delete"
        >
          <LuTrash2 size={18} />
        </button>
      </motion.div>
      
      <div style={styles.glow} />
    </motion.div>
  );
};
