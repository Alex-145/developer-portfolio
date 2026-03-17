import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import './ExperienceDiff.css';

const ExperienceDiff = () => {
  const { lang } = useContext(LanguageContext);

  const diffData = [
    { type: 'unchanged', text: `# ${lang === 'es' ? 'Experiencia Profesional' : 'Professional Experience'}` },
    { type: 'unchanged', text: `` },
    { type: 'added', text: `## ${lang === 'es' ? 'Desarrollador de Soporte y Mantenimiento' : 'Support and Maintenance Developer'}` },
    { type: 'added', text: `### OPTIMIZA S.A.C. (Freelance Project)` },
    { type: 'added', text: `*${lang === 'es' ? 'Enero' : 'January'} 2026 - ${lang === 'es' ? 'Marzo' : 'March'} 2026*` },
    { type: 'added', text: `` },
    { type: 'added', text: lang === 'es' ? `Desarrollo de GestionTK, plataforma integral para gestión de clientes, seguimiento de contratos y control de horas operativas.` : `Development of GestionTK, an integral platform for client management, contract tracking, and operational hours control.` },
    { type: 'added', text: lang === 'es' ? `Implementación Full Stack utilizando Laravel 11, PHP 8.2, Vanilla JS y MySQL.` : `Full Stack Implementation using Laravel 11, PHP 8.2, Vanilla JS, and MySQL.` },
    { type: 'added', text: lang === 'es' ? `Desarrollo de Dashboards: Paneles interactivos para el control de productividad en tiempo real.` : `Dashboard Development: Interactive dashboards for real-time productivity control.` },
    { type: 'added', text: `` },
    { type: 'unchanged', text: `## ${lang === 'es' ? 'Desarrollador Web' : 'Web Developer'}` },
    { type: 'unchanged', text: `### Linhs Llantas - ${lang === 'es' ? 'Tienda de Llantas' : 'Tire Shop'}` },
    { type: 'unchanged', text: `*${lang === 'es' ? 'Marzo' : 'March'} 2024 - ${lang === 'es' ? 'Enero' : 'January'} 2025*` },
    { type: 'unchanged', text: `` },
    { type: 'unchanged', text: lang === 'es' ? `Desarrollo de la página web oficial usando HTML, CSS, JavaScript y Bootstrap.` : `Development of the official website using HTML, CSS, JavaScript, and Bootstrap.` },
    { type: 'unchanged', text: lang === 'es' ? `Creación de dashboard con gráficos usando chart.js.` : `Dashboard creation with charts using chart.js.` },
    { type: 'unchanged', text: lang === 'es' ? `Implementación del sistema usando PHP y MySQL.` : `System Implementation using PHP and MySQL.` },
    { type: 'unchanged', text: `` },
    { type: 'deleted', text: `// ${lang === 'es' ? 'Antiguo rol legado eliminado por brevedad' : 'Old legacy role removed for brevity'}` },
    { type: 'unchanged', text: `## ${lang === 'es' ? 'Practicante de Desarrollo de Software' : 'Software Development Trainee'}` },
    { type: 'unchanged', text: `### Sunat` },
  ];

  return (
    <div className="diff-container">
      <div className="diff-header">
        <span className="diff-title">experience_diff.md (Working Tree)</span>
      </div>
      <div className="diff-view">
        <div className="diff-pane left-pane">
          <div className="pane-header">HEAD</div>
          <div className="pane-content">
            {diffData.map((line, idx) => {
              if (line.type === 'added') return null; // Not in old version
              return (
                <div key={`left-${idx}`} className={`diff-line ${line.type === 'deleted' ? 'line-removed' : ''}`}>
                  <span className="line-num"></span>
                  <span className="line-text">{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="diff-pane right-pane">
          <div className="pane-header">experience.md</div>
          <div className="pane-content">
             {diffData.map((line, idx) => {
              if (line.type === 'deleted') return null; // Not in new version
              return (
                <div key={`right-${idx}`} className={`diff-line ${line.type === 'added' ? 'line-added' : ''}`}>
                  <span className="line-num"></span>
                  <span className="line-text">{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDiff;
