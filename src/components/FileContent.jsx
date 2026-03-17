import React from 'react';
import ReactMarkdown from 'react-markdown';
import Home from './Home';
import Experience from './Experience';
import ProfileInfo from './ProfileInfo';
import Contact from './Contact';
import ExperienceDiff from './ExperienceDiff';

const FileContent = ({ file, onOpenFileByName }) => {
  if (!file) return null;

  const getLanguageClass = () => {
    if (file.name.endsWith('.json')) return 'content-code json';
    if (file.name.endsWith('.js')) return 'content-code js';
    return 'content-txt';
  };

  const renderContent = () => {
    if (file.name === 'Lino_Alex.jsx') {
      return <Home onNavigate={onOpenFileByName} />;
    }

    if (file.name === 'experience.md') {
      return <Experience data={file.content} />;
    }

    if (file.name === 'profile_info.json') {
      return <ProfileInfo data={file.content} />;
    }

    if (file.name === 'contact.json') {
      // portfolio.js exports contact.json as a raw JSON string to keep the VS Code illusion
      const contactData = JSON.parse(file.content);
      return <Contact data={contactData} />;
    }

    if (file.name === 'experience_diff.md') {
      return <ExperienceDiff />;
    }

    if (file.name.endsWith('.md')) {
      return (
        <div className="content-md">
          <ReactMarkdown>{file.content}</ReactMarkdown>
        </div>
      );
    }
    
    // For JS, JSON, TXT show as raw code / text
    return (
      <pre className={getLanguageClass()}>
        <code>{file.content}</code>
      </pre>
    );
  };

  return (
    <div className="editor-content">
      {renderContent()}
    </div>
  );
};

export default FileContent;
