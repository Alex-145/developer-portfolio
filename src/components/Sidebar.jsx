import React, { useContext } from 'react';
import { ChevronDown, FileJson, FileText, Code } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const FileIcon = ({ name }) => {
  if (name.endsWith('.json')) return <FileJson className="file-icon icon-json" />;
  if (name.endsWith('.md')) return <FileText className="file-icon icon-md" />;
  if (name.endsWith('.js') || name.endsWith('.jsx')) return <Code className="file-icon icon-js" />;
  return <FileText className="file-icon icon-txt" />;
};

const Sidebar = ({ fileSystem, activeFile, onOpenFile, className }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className={`sidebar ${className || ''}`}>
      <div className="sidebar-header">
        {t.explorer}
      </div>
      <div className="explorer-section">
        <div className="explorer-title">
          <ChevronDown size={14} style={{ marginRight: 4 }} />
          {t.portfolio}
        </div>
        <div className="file-list">
          {fileSystem.children.map((file) => (
            <div
              key={file.name}
              className={`file-item ${activeFile === file.name ? 'active' : ''}`}
              onClick={() => onOpenFile(file)}
            >
              <FileIcon name={file.name} />
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
