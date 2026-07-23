// assets/i18n.js — Motor de idioma compartido en TODAS las páginas del sitio.
(function () {
    if (window.__trazioI18nInit) return;
    window.__trazioI18nInit = true;

    window.TRAZIO_I18N = {
        es: {
            // Navegación
            'nav-portfolio-trigger': 'Portafolios',
            'nav-portfolio-visual-title': 'Perfil Visual / Artístico',
            'nav-portfolio-visual-desc': 'Fotógrafos, diseñadores, creativos',
            'nav-portfolio-tech-title': 'Perfil Técnico / Consultor',
            'nav-portfolio-tech-desc': 'Ingenieros, abogados, asesores',
            'nav-catalogs': 'Catálogos',
            'nav-corporate': 'Empresas',
            'nav-cta': 'Iniciar Proyecto',

            // Hero Home
            'hero-cta-primary': 'Explorar Soluciones',
            'hero-cta-secondary': 'Cotizar mi Proyecto',

            // Tarjetas de Soluciones (Home)
            'card-catalogs-title': 'Catálogos de Venta',
            'card-catalogs-benefit-1': 'Muestra productos con elegancia.',
            'card-catalogs-benefit-2': 'Pedidos directos a WhatsApp.',
            'card-catalogs-benefit-3': 'Actualizaciones rápidas y sencillas.',
            'card-portfolios-title': 'Portafolios Creativos',
            'card-portfolios-benefit-1': 'Destaca tu talento.',
            'card-portfolios-benefit-2': 'Diseño moderno y adaptable.',
            'card-portfolios-benefit-3': 'Impacta a clientes internacionales.',
            'card-corporate-title': 'Páginas Corporativas',
            'card-corporate-benefit-1': 'Proyecta una imagen profesional.',
            'card-corporate-benefit-2': 'Información clara disponible 24/7.',
            'card-corporate-benefit-3': 'Refuerza la confianza B2B.',

            // Footer
            'footer-tagline': 'Trazamos herramientas web de alta velocidad para optimizar tus ventas.',
            'footer-quick-links': 'Enlaces Rápidos',
            'footer-contact': 'Contacto',
            'footer-aida-text': '¿Listo para hacer crecer tu negocio?',
            'footer-aida-desc': 'Escríbenos y cuéntanos tu idea o mándanos tu lista de precios por WhatsApp. Te preparamos una demostración interactiva totalmente gratis y adaptada a tu sector en menos de 24 horas.',
            'footer-microcopy': 'Sin costo técnico, compromisos ni contratos de mantenimiento.',
            'all-rights-reserved': 'Todos los derechos reservados.'
        },
        en: {
            // Navegación
            'nav-portfolio-trigger': 'Portfolios',
            'nav-portfolio-visual-title': 'Visual / Creative Profile',
            'nav-portfolio-visual-desc': 'Photographers, designers, creatives',
            'nav-portfolio-tech-title': 'Technical / Consultant Profile',
            'nav-portfolio-tech-desc': 'Engineers, lawyers, advisors',
            'nav-catalogs': 'Catalogs',
            'nav-corporate': 'Business',
            'nav-cta': 'Start Project',

            // Hero Home
            'hero-cta-primary': 'Explore Solutions',
            'hero-cta-secondary': 'Quote my Project',

            // Tarjetas de Soluciones (Home)
            'card-catalogs-title': 'Sales Catalogs',
            'card-catalogs-benefit-1': 'Showcase products elegantly.',
            'card-catalogs-benefit-2': 'Direct WhatsApp orders.',
            'card-catalogs-benefit-3': 'Fast and easy updates.',
            'card-portfolios-title': 'Creative Portfolios',
            'card-portfolios-benefit-1': 'Highlight your talent.',
            'card-portfolios-benefit-2': 'Modern & adaptive design.',
            'card-portfolios-benefit-3': 'Impress international clients.',
            'card-corporate-title': 'Corporate Pages',
            'card-corporate-benefit-1': 'Project professional image.',
            'card-corporate-benefit-2': 'Clear info accessible 24/7.',
            'card-corporate-benefit-3': 'Strengthen B2B trust.',

            // Footer
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