import React, { useContext } from 'react';
import { Briefcase, Calendar, ExternalLink, Key } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './Experience.css';
import { LanguageContext } from '../context/LanguageContext';

const Experience = ({ data }) => {
  const { lang } = useContext(LanguageContext);
  const title = lang === 'es' ? 'Experiencia Profesional' : 'Professional Experience';

  return (
    <div className="experience-container">
      <h2 className="experience-header">
        <Briefcase className="inline-icon" size={28} /> {title}
      </h2>
      <div className="timeline">
        {data.map((job, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-period">
                  <Calendar size={14} className="inline-icon" /> {job.period}
                </span>
              </div>
              <h4 className="job-company">{job.company}</h4>
              
              {job.demo && (
                <div className="demo-card">
                  <div className="demo-link">
                    <ExternalLink size={16} />
                    <a href={job.demo.url} target="_blank" rel="noreferrer">
                      {lang === 'es' ? 'Ver Demo: GestionTK' : 'View Demo: GestionTK'}
                    </a>
                  </div>
                  <div className="demo-credentials">
                    <div className="cred-title"><Key size={14}/> {lang === 'es' ? 'Credenciales de Acceso' : 'Test Credentials'}</div>
                    <div className="cred-item"><strong>Admin:</strong> {job.demo.admin}</div>
                    <div className="cred-item"><strong>User:</strong> {job.demo.user}</div>
                  </div>
                </div>
              )}

              <ul className="job-bullets">
                {job.bullets.map((bullet, idx) => (
                  <li key={idx}>
                    <ReactMarkdown>{bullet}</ReactMarkdown>
                  </li>
                ))}
              </ul>

              {job.reference && (
                <div className="job-reference">
                  <em>{job.reference}</em>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
