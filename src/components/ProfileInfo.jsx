import React, { useContext } from 'react';
import { GraduationCap, Code2, Database, Workflow, Languages as LangIcon } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import './ProfileInfo.css';

const ProfileInfo = ({ data }) => {
  const { lang, t } = useContext(LanguageContext);
  const { education, skills } = data;

  const renderDevicon = (tech) => {
    const techLower = tech.toLowerCase();
    let url = '';
    
    // Mapping technologies to their SVG CDN endpoints
    if (techLower.includes('javascript')) url = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg';
    else if (techLower.includes('python')) url = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg';
    else if (techLower.includes('php')) url = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg';
    else if (techLower.includes('java') && !techLower.includes('javascript')) url = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg';
    else if (techLower.includes('mysql')) url = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg';
    else if (techLower.includes('sqlserver')) url = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg';
    else if (techLower.includes('powerbi')) url = 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg'; // Devicon lacks PowerBI, using wiki SVG
    else if (techLower.includes('excel')) url = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Microsoft_Office_Excel_%282018%E2%80%93present%29.svg'; // Devicon lacks Excel, using wiki SVG
    
    if (url) {
      return <img src={url} alt={tech} className="skill-icon-svg" />;
    }
    return <Code2 className="skill-icon-default" size={18} />;
  };

  return (
    <div className="profile-container">
      
      {/* Education Section */}
      <div className="profile-section education-card">
        <h2 className="section-title">
          <GraduationCap className="inline-icon highlight" size={28} />
          {lang === 'es' ? 'Educación' : 'Education'}
        </h2>
        
        <div className="edu-body">
          <div className="edu-logo-wrapper">
             <img src={`${import.meta.env.BASE_URL}logoupeu.webp`} alt="UPeU Logo" className="edu-logo" />
          </div>
          <div className="edu-details">
            <h3 className="edu-degree">{education.degree}</h3>
            <h4 className="edu-institution">{education.institution}</h4>
            <div className="edu-meta">
              <span className="edu-period">{education.period}</span>
              <span className="edu-location">{education.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Skills Section */}
      <div className="profile-section skills-section">
        <h2 className="section-title">
          <Workflow className="inline-icon highlight" size={28} />
          {t.skillsTitle || (lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills')}
        </h2>

        <div className="skills-grid">
          
          {/* Languages */}
          <div className="skill-category">
            <h4 className="category-title"><Code2 size={16} /> {lang === 'es' ? 'Lenguajes' : 'Languages'}</h4>
            <div className="tags-container">
              {skills.languages.map(skill => (
                <div key={skill} className="skill-tag premium">
                  {renderDevicon(skill)} <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database & Data */}
          <div className="skill-category">
            <h4 className="category-title"><Database size={16} /> Data</h4>
            <div className="tags-container">
              {skills.data.map(skill => (
                <div key={skill} className="skill-tag premium">
                  {renderDevicon(skill)} <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ERP & Processes */}
          <div className="skill-category">
            <h4 className="category-title"><Workflow size={16} /> ERP & {lang === 'es' ? 'Procesos' : 'Processes'}</h4>
            <div className="tags-container">
              {skills.erpAndProcesses.map(skill => (
                <div key={skill} className="skill-tag basic">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Spoken Languages */}
          <div className="skill-category">
            <h4 className="category-title"><LangIcon size={16} /> {lang === 'es' ? 'Idiomas' : 'Spoken Languages'}</h4>
            <div className="tags-container">
              {skills.languagesSpoken.map(skill => (
                <div key={skill} className="skill-tag language-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ProfileInfo;
