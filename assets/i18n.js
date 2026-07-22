// assets/i18n.js — Motor de idioma compartido en TODAS las páginas del sitio.
(function () {
    if (window.__trazioI18nInit) return;
    window.__trazioI18nInit = true;

    window.TRAZIO_I18N = {
        es: {
            'nav-portfolio-trigger': 'Portafolios',
            'nav-portfolio-visual-title': 'Perfil Visual / Artístico',
            'nav-portfolio-visual-desc': 'Fotógrafos, diseñadores, creativos',
            'nav-portfolio-tech-title': 'Perfil Técnico / Consultor',
            'nav-portfolio-tech-desc': 'Ingenieros, abogados, asesores',
            'nav-catalogs': 'Catálogos',
            'nav-corporate': 'Empresas',
            'nav-cta': 'Iniciar Proyecto',
            'footer-tagline': 'Trazamos herramientas web de alta velocidad para optimizar tus ventas.',
            'footer-quick-links': 'Enlaces Rápidos',
            'footer-contact': 'Contacto',
            'footer-aida-text': '¿Listo para hacer crecer tu negocio?',
            'footer-aida-desc': 'Escríbenos y cuéntanos tu idea o mándanos tu lista de precios por WhatsApp. Te preparamos una demostración interactiva totalmente gratis y adaptada a tu sector en menos de 24 horas.',
            'footer-microcopy': 'Sin costo técnico, compromisos ni contratos de mantenimiento.',
            'all-rights-reserved': 'Todos los derechos reservados.'
        },
        en: {
            'nav-portfolio-trigger': 'Portfolios',
            'nav-portfolio-visual-title': 'Visual / Creative Profile',
            'nav-portfolio-visual-desc': 'Photographers, designers, creatives',
            'nav-portfolio-tech-title': 'Technical / Consultant Profile',
            'nav-portfolio-tech-desc': 'Engineers, lawyers, advisors',
            'nav-catalogs': 'Catalogs',
            'nav-corporate': 'Business',
            'nav-cta': 'Start Project',
            'footer-tagline': 'We build high-speed web tools to optimize your sales.',
            'footer-quick-links': 'Quick Links',
            'footer-contact': 'Contact',
            'footer-aida-text': 'Ready to grow your business?',
            'footer-aida-desc': 'Message us with your idea or send your price list on WhatsApp. We\'ll prepare a free interactive demo tailored to your industry in under 24 hours.',
            'footer-microcopy': 'No technical costs, commitments, or maintenance contracts.',
            'all-rights-reserved': 'All rights reserved.'
        }
    };

    function applyLanguage(lang) {
        var dict = window.TRAZIO_I18N[lang] || {};
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('trazio-lang', lang);
        var display = document.getElementById('current-lang-display');
        if (display) display.textContent = lang.toUpperCase();
    }

    document.addEventListener('DOMContentLoaded', function () {
        var saved = localStorage.getItem('trazio-lang') || 'es';
        applyLanguage(saved);

        var toggle = document.getElementById('language-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                var current = localStorage.getItem('trazio-lang') || 'es';
                applyLanguage(current === 'es' ? 'en' : 'es');
            });
        }
    });
})();