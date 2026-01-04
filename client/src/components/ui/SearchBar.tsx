import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuSearch, LuX } from 'react-icons/lu';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const styles = {
  container: {
    position: 'relative' as const,
    zIndex: 10,
  },
  inputWrapper: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--accent-primary)',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: '48px',
    transition: 'border-color 0.2s, background 0.2s',
  },
  focused: {
    background: 'var(--bg-panel)',
    // borderColor: 'var(--accent-primary)',
    boxShadow: 'var(--shadow-glow)',
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '16px',
    marginLeft: '12px',
    width: '100%',
    outline: 'none',
    fontWeight: 500,
  },
  icon: {
    color: 'var(--text-secondary)',
  }
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={styles.container}>
      <motion.div 
        style={{
          ...styles.inputWrapper,
          ...(isFocused ? styles.focused : {})
        }}
        layout
        initial={{ width: 300 }}
        animate={{ width: isFocused || value ? 450 : 300 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <LuSearch size={20} style={{ ...styles.icon, color: isFocused ? 'var(--accent-primary)' : 'var(--text-secondary)' }} />
        <input
          style={styles.input}
          placeholder="Search your library..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value && (
          <button 
            onClick={() => onChange('')}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--text-secondary)',
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <LuX size={16} />
          </button>
        )}
      </motion.div>
    </div>
  );
};
