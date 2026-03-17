import React, { useState, useContext, useEffect } from 'react';
import { Settings, Search, GitBranch, Play, Square, FileCode2, Moon, Sun, Languages, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TabsBar from './components/TabsBar';
import FileContent from './components/FileContent';
import SearchModal from './components/SearchModal';
import { getFileSystem } from './data/portfolio';
import { ThemeContext } from './context/ThemeContext';
import { LanguageContext } from './context/LanguageContext';

function App() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { lang, t, toggleLanguage } = useContext(LanguageContext);
  
  // Obtain the translated file system tree based on current language
  const fileSystem = getFileSystem(lang);

  const [openFileNames, setOpenFileNames] = useState([fileSystem.children[0].name]); // about.json open by default
  const [activeFile, setActiveFile] = useState(fileSystem.children[0].name);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  const handleOpenFile = (file) => {
    // Check if already open by name
    if (!openFileNames.includes(file.name)) {
      setOpenFileNames([...openFileNames, file.name]);
    }
    setActiveFile(file.name);
  };

  const openGitDiff = () => {
    const diffFileName = 'experience_diff.md';
    if (!openFileNames.includes(diffFileName)) {
      setOpenFileNames([...openFileNames, diffFileName]);
    }
    setActiveFile(diffFileName);
  };

  const handleCloseFile = (fileName) => {
    const newFileNames = openFileNames.filter(name => name !== fileName);
    setOpenFileNames(newFileNames);
    
    // Manage active tab if the closed tab was active
    if (activeFile === fileName) {
      if (newFileNames.length > 0) {
        setActiveFile(newFileNames[newFileNames.length - 1]);
      } else {
        setActiveFile(null);
      }
    }
  };

  const openFileByName = (name) => {
    const file = fileSystem.children.find(f => f.name === name);
    if (file) handleOpenFile(file);
  };

  // Re-map the open files strings to actual file components dynamically to ensure translations persist
  // We manually mock 'experience_diff.md' since it's not in the main tree
  const openFiles = openFileNames.map(name => {
    if (name === 'experience_diff.md') return { name: 'experience_diff.md', type: 'file', content: '' };
    return fileSystem.children.find(f => f.name === name);
  }).filter(Boolean);
  
  const activeContentFile = openFiles.find(f => f.name === activeFile);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="menu-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="mobile-title">
          {activeFile || 'Portfolio'}
        </div>
        <div style={{ width: 40 }}></div> {/* Spacer for symmetry */}
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Activity Bar */}
      <div className={`activity-bar ${isSidebarOpen ? 'mobile-visible' : ''}`}>
        <FileCode2 className="activity-icon active" size={28} />
        <Search className="activity-icon" size={24} title={lang === 'en' ? 'Search' : 'Buscar'} onClick={() => setIsSearchOpen(true)} />
        <GitBranch className="activity-icon" size={24} title="Source Control" onClick={openGitDiff} />
        
        <div className="activity-icon" onClick={toggleFullscreen} title={isFullscreen ? (lang === 'en' ? 'Exit Fullscreen' : 'Salir de Pantalla Completa') : (lang === 'en' ? 'Enter Fullscreen' : 'Pantalla Completa')}>
          {isFullscreen ? <Square size={24} /> : <Play size={24} />}
        </div>

        <div style={{ flex: 1 }}></div>

        <div className={`settings-subpanel ${showSettingsPanel ? '' : 'hidden'}`}>
          <div className="activity-icon" onClick={toggleLanguage} title={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}>
            <Languages size={24} />
            <span style={{ fontSize: '10px', display: 'block', textAlign: 'center', marginTop: '2px' }}>{lang.toUpperCase()}</span>
          </div>

          <div className="activity-icon" onClick={toggleTheme} title="Toggle Theme">
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </div>
        </div>
        
        <Settings 
          className={`activity-icon gear-icon ${showSettingsPanel ? 'active-gear' : ''}`} 
          size={24} 
          onClick={() => setShowSettingsPanel(!showSettingsPanel)}
        />
      </div>

      {/* Sidebar Explorer */}
      <Sidebar 
        fileSystem={fileSystem} 
        activeFile={activeFile} 
        onOpenFile={(file) => {
          handleOpenFile(file);
          setIsSidebarOpen(false); // Close sidebar on mobile after selection
        }} 
        className={isSidebarOpen ? 'mobile-visible' : ''}
      />

      {/* Main Content Area */}
      <div className="main-area">
        <TabsBar 
          openFiles={openFiles} 
          activeFile={activeFile} 
          onSelectFile={setActiveFile} 
          onCloseFile={handleCloseFile} 
        />
        
        {activeContentFile ? (
          <FileContent 
            file={activeContentFile} 
            onOpenFileByName={openFileByName}
          />
        ) : (
          <div className="empty-editor">
            <FileCode2 size={100} />
            <h2>VS Code Themed Portfolio</h2>
            <br />
            <p>{t.emptyEditorText}</p>
          </div>
        )}
      </div>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        fileSystem={fileSystem} 
        onOpenFile={handleOpenFile} 
      />
    </div>
  );
}

export default App;
