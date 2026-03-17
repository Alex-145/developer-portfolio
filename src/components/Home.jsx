import React, { useContext } from 'react';
import { Download, Mail, Github, Linkedin, Briefcase, Code2 } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import './Home.css';

const Home = ({ onNavigate }) => {
  const { t } = useContext(LanguageContext);
  const [showDownloadMenu, setShowDownloadMenu] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fullName = "Lino Alex Huamanvilca Huaylla";

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="profile-section">
          <div className="profile-image-container">
            <img src="/profile.jpg" alt="Lino Alex" className="profile-image" />
            <div className="profile-glow"></div>
          </div>
          
          <h1 className="home-name">{fullName}</h1>
          <h2 className="home-title">
            <Code2 className="inline-icon" size={24} />
            {t.title}
          </h2>
          
          <p className="home-description">
            {t.description}
          </p>

          <div className="home-actions">
            <div className="dropdown-container" ref={menuRef}>
              <button 
                className="btn btn-primary dropdown-trigger"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              >
                <Download size={18} />
                {t.download}
              </button>
              
              {showDownloadMenu && (
                <div className="dropdown-menu">
                  <a 
                    href="/Lino_Alex_Huamanvilca_Huaylla_CV.pdf" 
                    download={`${fullName} CV.pdf`} 
                    className="dropdown-item"
                    onClick={() => setShowDownloadMenu(false)}
                  >
                    {t.cvSolo}
                  </a>
                  <a 
                    href="/Lino_Alex_Huamanvilca_Huaylla_CV_Documentado.pdf" 
                    download={`${fullName} CV Documentado.pdf`} 
                    className="dropdown-item"
                    onClick={() => setShowDownloadMenu(false)}
                  >
                    {t.cvDocumented}
                  </a>
                </div>
              )}
            </div>
            
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('contact.json')}
            >
              <Mail size={18} />
              {t.contact}
            </button>
          </div>

          <div className="social-links">
            <a href="https://github.com/Alex-145" target="_blank" rel="noreferrer" className="social-icon">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/alex-huamanvilca-7483362a3" target="_blank" rel="noreferrer" className="social-icon">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div className="skills-grid-container">
          <h3 className="section-title"><Briefcase className="inline-icon" size={20} /> {t.skillsTitle}</h3>
          <div className="skills-grid">
            <div className="skill-card">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="30" height="30" alt="JavaScript" className="skill-icon" />
              <span>JavaScript</span>
            </div>
            <div className="skill-card">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="28" height="28" alt="Python" className="skill-icon" />
              <span>Python</span>
            </div>
            <div className="skill-card">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" width="28" height="28" alt="MySQL" className="skill-icon" />
              <span>MySQL</span>
            </div>
            <div className="skill-card">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" width="32" height="32" alt="PHP" className="skill-icon" />
              <span>PHP</span>
            </div>
            <div className="skill-card">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" width="32" height="32" alt="Laravel" className="skill-icon" />
              <span>Laravel</span>
            </div>
            <div className="skill-card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" width="30" height="30" alt="Power BI" className="skill-icon" />
              <span>Power BI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
