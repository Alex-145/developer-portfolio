export const getFileSystem = (lang) => {
  const isEs = lang === 'es';

  return {
    name: "portfolio",
    type: "folder",
    children: [
      {
        name: "Lino_Alex.jsx",
        type: "file",
        content: ""
      },
      {
        name: "experience.md",
        type: "file",
        content: isEs ? [
          {
            title: "Desarrollador Soporte y Mantenimiento",
            company: "OPTIMIZA S.A.C. (Proyecto Freelance)",
            period: "Enero 2026 – Marzo 2026",
            demo: {
              url: "https://gestiontk.linhsllantas.com",
              admin: "admin / admin123456",
              user: "usuario / user123456"
            },
            bullets: [
              "**Desarrollo de GestionTK**, una plataforma integral para la administración de clientes, seguimiento de contratos y control de horas operativas.",
              "**Implementación Full Stack** utilizando **Laravel 11, PHP 8.2, Vanilla JS y MySQL**.",
              "**Desarrollo de Dashboards** interactivos para el monitoreo de productividad en tiempo real y la gestión del crédito de horas de contratos.",
              "**Optimización de Reportes** mediante la generación dinámica de reportes financieros automáticos en Excel.",
              "**Mejora de UX/UI** aplicando diseño responsivo y resolviendo problemas complejos de sincronización de estados de tiempo en vivo."
            ]
          },
          {
            title: "Asistente de TI",
            company: "OPTIMIZA S.A.C. / Pdk Peru S.R.L. (Lima, Perú)",
            period: "Mayo 2025 – Diciembre 2025",
            demo: null,
            bullets: [
              "Apoyo en la elaboración de reportes e informes operativos.",
              "Automatización de reportes semanales mediante scripts y consultas SQL.",
              "Creación de dashboards en Power BI para análisis de datos y toma de decisiones.",
              "Actualización, validación y control de información en S10 ERP.",
              "Soporte al equipo operativo y documentación del proyecto URBAN HEIGHTS."
            ],
            reference: "Referencia: Lander Huarazaya — Administrador de Proyecto — +51 987 031 180"
          },
          {
            title: "Desarrollador Full Stack",
            company: "LINHS LLANTAS (Challhuahuacho, Perú)",
            period: "Julio 2024 – Mayo 2025",
            demo: null,
            bullets: [
              "Desarrollo de un sistema de gestión empresarial para ventas, inventario y control administrativo.",
              "Elaboración de reportes operativos y consultas SQL para análisis de información.",
              "Modelamiento de procesos del negocio y levantamiento de requerimientos con usuarios.",
              "Optimización de procesos orientados a eficiencia operativa."
            ]
          }
        ] : [
          {
            title: "Support and Maintenance Developer",
            company: "OPTIMIZA S.A.C. (Freelance Project)",
            period: "January 2026 – March 2026",
            demo: {
              url: "https://gestiontk.linhsllantas.com",
              admin: "admin / admin123456",
              user: "usuario / user123456"
            },
            bullets: [
              "**Development of GestionTK**, an integral platform for client management, contract tracking, and operational hours control.",
              "**Full Stack Implementation** using **Laravel 11, PHP 8.2, Vanilla JS, and MySQL**.",
              "**Dashboard Development**: Interactive dashboards for real-time productivity monitoring and contract hours credit management.",
              "**Report Optimization** through the dynamic generation of automatic financial reports in Excel.",
              "**UX/UI Improvement** applying responsive design and solving complex life-time state synchronization issues."
            ]
          },
          {
            title: "IT Assistant",
            company: "OPTIMIZA S.A.C. / Pdk Peru S.R.L. (Lima, Peru)",
            period: "May 2025 – December 2025",
            demo: null,
            bullets: [
              "Support in the preparation of operational reports and briefs.",
              "Automation of weekly reports through scripts and SQL queries.",
              "Creation of dashboards in Power BI for data analysis and decision making.",
              "Update, validation, and control of information in S10 ERP.",
              "Support to the operational team and documentation of the URBAN HEIGHTS project."
            ]
          },
          {
            title: "Full Stack Developer",
            company: "LINHS LLANTAS (Challhuahuacho, Peru)",
            period: "July 2024 – May 2025",
            demo: null,
            bullets: [
              "Development of a business management system for sales, inventory, and administrative control.",
              "Elaboration of operational reports and SQL queries for information analysis.",
              "Business process modeling and requirements gathering with users.",
              "Optimization of processes aimed at operational efficiency."
            ]
          }
        ]
      },
      {
        name: "profile_info.json",
        type: "file",
        content: isEs ? {
          education: {
            institution: "UNIVERSIDAD PERUANA UNIÓN – FILIAL JULIACA",
            location: "Juliaca, Perú",
            degree: "Ingeniería de Sistemas – Facultad de Ingeniería y Arquitectura",
            period: "Marzo 2020 – Diciembre 2025"
          },
          skills: {
            languages: ["JavaScript", "Python", "PHP", "Java"],
            data: ["MySQL", "SQLServer", "PowerBI", "Excel"],
            erpAndProcesses: ["SAP", "BPMN", "S10"],
            languagesSpoken: ["Inglés: Intermedio (B1)", "Español: Nativo"]
          }
        } : {
          education: {
            institution: "UNIVERSIDAD PERUANA UNION – JULIACA BRANCH",
            location: "Juliaca, Peru",
            degree: "Systems Engineering – Faculty of Architecture and Engineering",
            period: "March 2020 – December 2025"
          },
          skills: {
            languages: ["JavaScript", "Python", "PHP", "Java"],
            data: ["MySQL", "SQLServer", "PowerBI", "Excel"],
            erpAndProcesses: ["SAP", "BPMN", "S10"],
            languagesSpoken: ["English: Intermediate (B1)", "Spanish: Native"]
          }
        }
      },
      {
        name: "contact.json",
        type: "file",
        content: `{
  "email": "linoalex145@gmail.com",
  "phone": "+51 925 227 408",
  "github": "https://github.com/Alex-145",
  "linkedin": "https://www.linkedin.com/in/alex-huamanvilca-7483362a3"
}`
      }
    ]
  };
};
