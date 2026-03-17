import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const translations = {
  es: {
    explorer: "EXPLORADOR",
    portfolio: "PORTAFOLIO",
    emptyEditorText: "Selecciona un archivo del explorador para ver su contenido.",
    title: "Ingeniero de Sistemas / Full Stack Developer",
    description: "Soy un Bachiller en Ingeniería de Sistemas apasionado por el desarrollo de software, análisis de datos y la automatización de procesos. Me enfoco en crear soluciones eficientes y escalables para resolver problemas complejos.",
    download: "Descargar CV",
    contact: "Contactarme",
    skillsTitle: "Tecnologías Destacadas",
    location: "Apurímac – Cotabambas – Challhuahuacho, Perú",
    cvSolo: "Solo CV (1 página)",
    cvDocumented: "Documentado (3 páginas)"
  },
  en: {
    explorer: "EXPLORER",
    portfolio: "PORTFOLIO",
    emptyEditorText: "Select a file from the explorer to view its contents.",
    title: "Systems Engineer / Full Stack Developer",
    description: "I am a Systems Engineering Bachelor passionate about software development, data analysis, and process automation. I focus on creating efficient and scalable solutions to solve complex problems.",
    download: "Download CV",
    contact: "Contact Me",
    skillsTitle: "Featured Technologies",
    location: "Apurimac – Cotabambas – Challhuahuacho, Peru",
    cvSolo: "CV Only (1 page)",
    cvDocumented: "Documented (3 pages)"
  }
};

export const LanguageProvider = ({ children }) => {
  // English is default per user request initially, then toggle back and forth
  const [lang, setLang] = useState('en'); 

  const toggleLanguage = () => setLang(lang === 'en' ? 'es' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
