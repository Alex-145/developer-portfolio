import React, { useState, useEffect, useRef, useContext } from 'react';
import { Search, X, File as FileIcon } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, fileSystem, onOpenFile }) => {
  const { lang } = useContext(LanguageContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults(fileSystem.children || []);
    }
  }, [isOpen, fileSystem]);

  useEffect(() => {
    if (!query) {
      setResults(fileSystem.children || []);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = (fileSystem.children || []).filter(file => 
      file.name.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query, fileSystem]);

  if (!isOpen) return null;

  const handleSelect = (file) => {
    onOpenFile(file);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            ref={inputRef}
            type="text" 
            className="search-input" 
            placeholder={lang === 'es' ? 'Buscar archivos por nombre (Ej. experience.md)' : 'Search files by name (e.g., experience.md)'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <X size={18} className="search-close" onClick={onClose} />
        </div>
        
        <div className="search-results">
          {results.length > 0 ? (
            results.map(file => (
              <div key={file.name} className="search-result-item" onClick={() => handleSelect(file)}>
                <FileIcon size={16} className="file-icon" />
                <span className="file-name">{file.name}</span>
                <span className="file-path">portfolio/{file.name}</span>
              </div>
            ))
          ) : (
            <div className="no-results">
              {lang === 'es' ? 'No se encontraron archivos coincidentes' : 'No matching files found'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
