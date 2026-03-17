import React from 'react';
import { X, FileJson, FileText, Code } from 'lucide-react';

const FileIcon = ({ name }) => {
  if (name.endsWith('.json')) return <FileJson className="file-icon icon-json" size={14}/>;
  if (name.endsWith('.md')) return <FileText className="file-icon icon-md" size={14}/>;
  if (name.endsWith('.js')) return <Code className="file-icon icon-js" size={14}/>;
  return <FileText className="file-icon icon-txt" size={14}/>;
};

const TabsBar = ({ openFiles, activeFile, onSelectFile, onCloseFile }) => {
  return (
    <div className="tabs-bar">
      {openFiles.map((file) => (
        <div
          key={file.name}
          className={`tab ${activeFile === file.name ? 'active' : ''}`}
          onClick={() => onSelectFile(file.name)}
        >
          <div className="tab-title">
            <FileIcon name={file.name} />
            {file.name}
          </div>
          <div
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation();
              onCloseFile(file.name);
            }}
          >
            <X size={14} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabsBar;
