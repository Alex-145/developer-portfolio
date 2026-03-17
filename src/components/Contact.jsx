import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Send, MessageSquare, Copy, Check, X } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import emailjs from '@emailjs/browser';
import './Contact.css';

const EMAILJS_SERVICE_ID = 'service_800p95q';
const EMAILJS_TEMPLATE_ID = 'template_apf3erg';
const EMAILJS_PUBLIC_KEY = 'kN4sDCfYSWcLyITs7';
const RECAPTCHA_SITE_KEY = '6LfG7IwsAAAAAJYPVAXh-aY35QpMpBFymFS209Jq';

const Contact = ({ data }) => {
  const { lang } = useContext(LanguageContext);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState({ show: false, type: '', msg: '' });
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaRendered = useRef(false);

  const displayToast = (type, msg) => {
    setToast({ show: true, type, msg });
    setTimeout(() => {
      setToast({ show: false, type: '', msg: '' });
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Explicitly render reCAPTCHA when the component mounts or language changes
  useEffect(() => {
    let timeoutId;

    const loadRecaptcha = (currentLang) => {
      // 1. Remove existing script and ReCaptcha injected scripts
      document.querySelectorAll('script[src*="recaptcha"]').forEach(el => el.remove());
      document.querySelectorAll('script[src*="gstatic.com/recaptcha"]').forEach(el => el.remove());
      
      // 2. Clear out the global variables used by ReCaptcha
      delete window.grecaptcha;
      delete window.___grecaptcha_cfg;
      delete window.onRecaptchaLoadCallback;

      // 3. Purge ReCaptcha popups/badges appended to the body
      document.querySelectorAll('.grecaptcha-badge').forEach(el => {
        if (el.parentNode) el.parentNode.remove();
      });
      document.querySelectorAll('div[style*="z-index: 2000000000"]').forEach(el => el.remove());
      document.querySelectorAll('iframe[title*="recaptcha"]').forEach(iframe => {
        const parent = iframe.closest('div[style*="position: absolute"]');
        if (parent) parent.remove();
      });

      // 4. Clear the local container
      if (recaptchaRef.current) {
        recaptchaRef.current.innerHTML = '';
        recaptchaRendered.current = false;
      }

      // 5. Inject the script again for the new language
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      
      window.onRecaptchaLoadCallback = () => {
        if (recaptchaRef.current && !recaptchaRendered.current && window.grecaptcha && window.grecaptcha.render) {
          try {
            window.grecaptcha.render(recaptchaRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
            });
            recaptchaRendered.current = true;
          } catch (e) {
            recaptchaRendered.current = true;
          }
        }
      };

      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit&hl=${currentLang}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    // Debounce to prevent multiple rapid script injections
    timeoutId = setTimeout(() => {
      loadRecaptcha(lang);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      delete window.onRecaptchaLoadCallback;
    };
  }, [lang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetRecaptcha = useCallback(() => {
    try {
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (e) {
      // Ignore reset errors
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      displayToast('error', lang === 'es' ? 'Por favor, completa todos los campos.' : 'Please fill in all fields.');
      return;
    }

    // Verify reCAPTCHA
    let recaptchaResponse = '';
    try {
      recaptchaResponse = window.grecaptcha?.getResponse() || '';
    } catch (e) {
      recaptchaResponse = '';
    }
    if (!recaptchaResponse) {
      displayToast('error', lang === 'es' ? 'Por favor, completa el captcha.' : 'Please complete the captcha.');
      return;
    }

    setIsSending(true);
    setToast({ show: false, type: '', msg: '' });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
          'g-recaptcha-response': recaptchaResponse,
        },
        EMAILJS_PUBLIC_KEY
      );

      displayToast('success',
        lang === 'es'
          ? '¡Mensaje enviado correctamente! Me pondré en contacto pronto.'
          : 'Message sent successfully! I will be in touch soon.'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      resetRecaptcha();

    } catch (error) {
      displayToast('error',
        lang === 'es'
          ? `Error enviando el mensaje: ${error?.text || error?.message || 'Error desconocido'}`
          : `Error sending message: ${error?.text || error?.message || 'Unknown error'}`
      );
      resetRecaptcha();
    } finally {
      setIsSending(false);
    }
  };

  const cleanPhoneForWA = (phoneString) => {
    return phoneString.replace(/\D/g, '');
  };

  return (
    <div className="contact-container">

      <div className="contact-card">

        {/* Left Panel: Direct Links */}
        <div className="contact-info-panel">
          <h2 className="contact-title">{lang === 'es' ? 'Conectemos' : "Let's Connect"}</h2>
          <p className="contact-subtitle">
            {lang === 'es'
              ? '¿Tienes un proyecto en mente o buscas un desarrollador? ¡Escríbeme por cualquiera de estos medios!'
              : 'Have a project in mind or looking for a developer? Reach out through any of these channels!'}
          </p>

          <div className="contact-links">
            <div className="contact-email-wrapper">
              <div className="contact-email-text">
                <Mail className="contact-icon" />
                <span>{data.email}</span>
              </div>
              <button 
                type="button"
                className="copy-email-btn" 
                onClick={handleCopyEmail}
                title={lang === 'es' ? 'Copiar al portapapeles' : 'Copy to clipboard'}
              >
                {copied ? <Check size={18} className="success-icon" /> : <Copy size={18} />}
              </button>
            </div>

            <a href={`https://wa.me/${cleanPhoneForWA(data.phone)}`} target="_blank" rel="noreferrer" className="contact-link-item whatsapp-link">
              <MessageSquare className="contact-icon" />
              <span>{lang === 'es' ? 'Escríbeme al WhatsApp' : 'Message on WhatsApp'}<br/><small>{data.phone}</small></span>
            </a>

            <a href={data.linkedin} target="_blank" rel="noreferrer" className="contact-link-item">
              <Linkedin className="contact-icon" />
              <span>{lang === 'es' ? 'Perfil de LinkedIn' : 'LinkedIn Profile'}</span>
            </a>

            <a href={data.github} target="_blank" rel="noreferrer" className="contact-link-item">
              <Github className="contact-icon" />
              <span>{lang === 'es' ? 'Repositorio en GitHub' : 'GitHub Repository'}</span>
            </a>
          </div>
        </div>

        {/* Right Panel: Email Form */}
        <div className="contact-form-panel">
          <h3 className="form-title">{lang === 'es' ? 'Envíame un Correo' : 'Send me an Email'}</h3>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{lang === 'es' ? 'Tu Nombre' : 'Your Name'}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{lang === 'es' ? 'Tu Email' : 'Your Email'}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">{lang === 'es' ? 'Asunto' : 'Subject'}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={lang === 'es' ? 'Oportunidad de proyecto...' : 'Job Opportunity...'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{lang === 'es' ? 'Mensaje' : 'Message'}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder={lang === 'es' ? 'Hola Lino, me gustaría...' : 'Hi Lino, I would like to...'}
              ></textarea>
            </div>

            {/* Google reCAPTCHA v2 */}
            <div className="recaptcha-container">
              <div ref={recaptchaRef}></div>
            </div>



            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending
                ? (lang === 'es' ? 'Enviando...' : 'Sending...')
                : <><Send size={18} /> {lang === 'es' ? 'Enviar Mensaje' : 'Send Message'}</>
              }
            </button>
          </form>
        </div>

      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' ? <Check size={20} /> : <X size={20} />}
          </div>
          <div className="toast-content">{toast.msg}</div>
          <button type="button" className="toast-close" onClick={() => setToast({ show: false, type: '', msg: '' })}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
