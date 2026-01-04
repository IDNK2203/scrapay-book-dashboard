// BookCard.tsx Refined
import React from 'react';
import { motion } from 'framer-motion';
import { LuPencil, LuTrash2 } from 'react-icons/lu';

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
    border: '1px solid rgba(255,255,255,0.1)', // Default visible border
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'border-color 0.2s, box-shadow 0.2s',
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
    // opacity handled by motion
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
};

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <motion.div 
      style={styles.card}
      whileHover="hover"
      initial="initial"
    >
      <div style={styles.info}>
        <div style={styles.title}>{book.title}</div>
        <div style={styles.author}>{book.author}</div>
      </div>
      
      {/* Actions: Revealed on hover */}
      <motion.div 
        style={styles.actions} 
        variants={{
          initial: { opacity: 0, y: 10 },
          hover: { opacity: 1, y: 0, transition: { duration: 0.2 } }
        }}
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
    </motion.div>
  );
};
