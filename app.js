/* COMENTARIO: Esperar a que el DOM esté completamente cargado para inicializar la interactividad de Trazio Studio */
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM globales para el control visual del sitio
    const themeSwitcher = document.getElementById('theme-switcher');
    const languageToggle = document.getElementById('language-toggle');
    const currentLangDisplay = document.getElementById('current-lang-display');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const themeIconSun = document.getElementById('theme-icon-sun');

    // --- COMENTARIO: Diccionario de Traducción Multiidioma (Optimizado para B2B y Conversión en Cuba) ---
    const translations = {
        es: {
            // Enlaces de navegación del menú principal
            "nav-portfolio": "Portafolios",
            "nav-catalogs": "Catálogos",
            "nav-corporate": "Empresas",
            "nav-cta": "Iniciar Proyecto",
            
            // Sección Hero (Primer contacto visual con propuesta de valor clara y llamadas a la acción directas)
            "hero-badge": "Estudio de Ingeniería & Estrategia Digital",
            "hero-title": "Trazamos la web que tu negocio necesita para <span class=\"text-custom-accent\">crecer y ser encontrado</span>.",
            "hero-subtitle": "Maquetamos herramientas web de alta velocidad para Cuba. Sin rentas mensuales de hosting y diseñadas para que tus clientes te encuentren en Google y te hagan pedidos directo a tu WhatsApp.",
            "hero-cta-primary": "Ver Soluciones",
            "hero-cta-secondary": "Analizar mi Negocio",
            
            // Sección de Portales de Soluciones (Muestra el menú general de alternativas de desarrollo)
            "solutions-portal-badge": "Nuestras Soluciones Digitales",
            "solutions-portal-title": "Impulsa tu Presencia Online",
            "solutions-portal-description": "Descubre cómo nuestras soluciones web personalizadas pueden transformar tu negocio, atraer más clientes y simplificar tus operaciones.",
            "card-catalogs-title": "Catálogos de Venta",
            "card-catalogs-benefit-1": "Muestra tus productos elegantemente.",
            "card-catalogs-benefit-2": "Pedidos directos vía WhatsApp.",
            "card-catalogs-benefit-3": "Actualizaciones fáciles y rápidas.",
            "card-portfolios-title": "Portafolios Creativos",
            "card-portfolios-benefit-1": "Destaca tu talento visualmente.",
            "card-portfolios-benefit-2": "Diseño moderno y adaptable.",
            "card-portfolios-benefit-3": "Impacta a clientes y empleadores.",
            "card-corporate-title": "Páginas Corporativas",
            "card-corporate-benefit-1": "Proyecta una imagen profesional.",
            "card-corporate-benefit-2": "Información clara y accesible 24/7.",
            "card-corporate-benefit-3": "Fortalece la confianza de tus clientes.",
            "card-learn-more": "Saber más &rarr;",

            // Etiquetas de los botones del Selector de Perfil
            "btn-profile-creativo": "Perfil Visual / Artístico",
            "btn-profile-corporativo": "Perfil Técnico / Consultor",
            
            // Portales - Títulos secundarios y descripciones
            "services-badge": "NUESTROS ENFOQUES",
            "services-title": "Soluciones digitales sin rodeos técnicos",
            "services-subtitle": "Diseñamos portales rápidos y directos para resolver los dolores comerciales más comunes de los emprendedores en Cuba.",
            "card1-title": "Catálogos de Pedidos",
            "card1-desc": "Convierte tu WhatsApp en un canal de ventas automatizado y organizado.",
            "card1-b1": "✔ Pedidos estructurados directamente a tu chat",
            "card1-b2": "✔ Carga ultra-rápida con datos móviles lentos",
            "card1-b3": "✔ Sin mensualidades de hosting o licencias",
            "card2-title": "Portafolios & Resumes",
            "card2-desc": "Muestra tu talento y cotízate mejor en el mercado nacional o internacional.",
            "card2-b1": "✔ Ideal para fotógrafos, artistas, modelos y profesionales",
            "card2-b2": "✔ Galerías optimizadas que consumen el mínimo de megas",
            "card2-b3": "✔ Tu marca personal con un aspecto premium e internacional",
            "card3-title": "Páginas Corporativas",
            "card3-desc": "La credibilidad institucional que tu Mipyme de servicios necesita para cerrar grandes contratos.",
            "card3-b1": "✔ Tu propio dominio .com y presencia en Google",
            "card3-b2": "✔ Correos profesionales corporativos (@tuempresa.com)",
            "card3-b3": "✔ Presentación de servicios, equipo y obras realizadas",
            "card-cta": "Ver detalles de la solución →",
            
            // --- Sección de Proceso Metodológico (3 pasos B2B Compactos según directrices) ---
            "process-badge": "Nuestro Método",
            "process-title": "Tu presencia online en 3 pasos",
            "process-subtitle": "Un flujo de trabajo optimizado y transparente para llevar tu negocio al entorno digital de forma profesional.",
            "step1-title": "Estrategia & Descubrimiento",
            "step1-desc": "Auditamos tu negocio y redactamos los textos persuasivos. Diseñamos la estructura ideal para que nuevos clientes y proveedores te encuentren en Google sin tecnicismos.",
            "step2-title": "Código Limpio & Autogestión",
            "step2-desc": "Programamos tu web en código puro. Es ultra-rápida en conexiones móviles y te enseñamos cómo cambiar tus productos, precios e imágenes tú mismo, sin depender de nadie.",
            "step3-title": "Lanzamiento con Host $0",
            "step3-desc": "Configuramos tu WhatsApp, enlazamos tu dominio propio y lanzamos tu web al mercado sin cuotas mensuales de servidores.",
            
            // --- Sección Quiénes Somos / La Diferencia Trazio (Sección de Alta Conversión B2B) ---
            "about-badge": "QUIÉNES SOMOS",
            "about-title": "Por qué trabajar con Trazio Studio",
            "about-text": "No somos solo diseñadores. Nuestra experiencia en finanzas corporativas, contabilidad y optimización de sistemas administrativos (como Odoo) nos permite entender tu negocio desde adentro. No hacemos páginas bonitas que no cargan; creamos herramientas lógicas enfocadas en reducir tus costes operativos, eliminar el caos de tus pedidos y multiplicar tu credibilidad comercial.",

            // --- Sección del Entorno Interactivo de Demostraciones ---
            "demo-badge": "Previsualización en Vivo",
            "demo-title": "Explora nuestras soluciones",
            "demo-subtitle": "Echa un vistazo a cómo se verán tus herramientas. Interfaces diseñadas con precisión de píxel, pensadas para la conversión y la usabilidad.",
            "demo-tab-catalog": "Catálogo Móvil",
            "demo-tab-portfolio": "Portafolio Creativo",
            "demo-tab-corporate": "Sitio Corporativo",
            "demo-cta-catalog": "Probar Demo Interactiva &rarr;",
            "demo-cta-portfolio": "Probar Demo de Portafolio &rarr;",
            "demo-cta-corporate": "Probar Demo Corporativa &rarr;",
            
            // Textos del Mockup de Teléfono e Interfaces de Demostración
            "mock-cat-title": "Atelier de Modas",
            "mock-cat-subtitle": "Colección Primavera-Verano",
            "mock-cat-prod-1-name": "Vestido Lino Arena",
            "mock-cat-prod-1-price": "$35.00 USD",
            "mock-cat-prod-2-name": "Sombrero Paja Sol",
            "mock-cat-prod-2-price": "$18.00 USD",
            "mock-cat-cart-total": "Total: $53.00 USD",
            "mock-cat-whatsapp-btn": "Enviar pedido a WhatsApp",
            
            "mock-port-title": "Raúl Silva",
            "mock-port-subtitle": "Fotografía de Arquitectura & Interiores",
            "mock-port-tag-1": "Composición",
            "mock-port-tag-2": "Minimalismo",
            "mock-port-tag-3": "Luz Natural",
            "mock-port-view-gallery": "Ver Proyecto Completo &rarr;",
            
            "mock-corp-name": "Constructa S.R.L.",
            "mock-corp-badge": "ESTUDIO DE INGENIERÍA & DISEÑO",
            "mock-corp-hero-title": "Edificamos estructuras con legado de excelencia.",
            "mock-corp-metric-1-num": "15+",
            "mock-corp-metric-1-label": "Años en Cuba",
            "mock-corp-metric-2-num": "80+",
            "mock-corp-metric-2-label": "Proyectos Listos",
            "mock-corp-contact-btn": "Agendar Consulta Directa",

            // --- Sección de Preguntas Frecuentes (FAQ - Orientada a mitigar barreras de compra) ---
            "faq-badge": "PREGUNTAS FRECUENTES",
            "faq-title": "Resolvemos tus dudas",
            "faq-subtitle": "Respuestas claras a las dudas más comunes sobre nuestras soluciones.",
            "faq-q1": "¿Por qué no usan WordPress?",
            "faq-a1": "WordPress es lento y requiere mantenimiento constante para no ser hackeado. Nuestro código estático puro en HTML y JS carga instantáneamente con datos móviles en Cuba, es 100% seguro y no se rompe jamás.",
            "faq-q2": "¿Qué significa que el hosting es gratis de por vida?",
            "faq-a2": "Al no usar bases de datos pesadas, publicamos tu web en servidores de la nube de alto rendimiento gratuitos. El coste de tu servidor mensual será $0 de por vida.",
            "faq-q3": "¿Cómo me llegan los pedidos?",
            "faq-a3": "El cliente navega por tu catálogo, selecciona los productos y, al tocar el botón, se genera un mensaje de WhatsApp perfectamente estructurado con su nombre, productos, cantidades y el cálculo del precio total.",
            "faq-q4": "¿Cuáles son las formas de pago?",
            "faq-a4": "Aceptamos pagos directos a través de Zelle, TropiPay, criptomonedas (USDT), y transferencias nacionales para facilitar las operaciones de las Mipymes locales.",

            // --- Footer / Pie de página ---
            "footer-tagline": "Trazamos herramientas web de alta velocidad para optimizar tus ventas.",
            "footer-aida-text": "¿Listo para hacer crecer tu negocio?",
            "footer-aida-desc": "Escríbenos y mándanos tu catálogo, lista de precios o idea por WhatsApp. Te preparamos una demostración interactiva totalmente gratis y adaptada a tu sector en menos de 24 horas.",
            "footer-aida-cta": "SOLICITAR DEMOSTRACIÓN GRATIS",
            "footer-microcopy": "<span class='text-custom-accent'>✔</span> Sin costo técnico, compromisos ni contratos de mantenimiento."
        },
        en: {
            // Main navigation links
            "nav-portfolio": "Portfolios",
            "nav-catalogs": "Catalogs",
            "nav-corporate": "Corporate",
            "nav-cta": "Start Project",
            
            // Hero Section
            "hero-badge": "Engineering & Digital Strategy Studio",
            "hero-title": "Tracing the website your business needs to <span class=\"text-custom-accent\">grow and be found</span>.",
            "hero-subtitle": "We code high-speed web tools for Cuba. Zero monthly hosting fees, designed so clients find you on Google and send organized orders straight to your WhatsApp.",
            "hero-cta-primary": "Explore Solutions",
            "hero-cta-secondary": "Audit my Business",
            
            // Solutions Section
            "solutions-portal-badge": "Our Digital Solutions",
            "solutions-portal-title": "Boost Your Online Presence",
            "solutions-portal-description": "Discover how our custom web solutions can transform your business, attract more clients, and simplify your operations.",
            "card-catalogs-title": "Sales Catalogs",
            "card-catalogs-benefit-1": "Showcase your products elegantly.",
            "card-catalogs-benefit-2": "Direct orders via WhatsApp.",
            "card-catalogs-benefit-3": "Easy and fast updates.",
            "card-portfolios-title": "Creative Portfolios",
            "card-portfolios-benefit-1": "Highlight your talent visually.",
            "card-portfolios-benefit-2": "Modern and adaptive design.",
            "card-portfolios-benefit-3": "Impress clients and employers.",
            "card-corporate-title": "Corporate Pages",
            "card-corporate-benefit-1": "Project a professional image.",
            "card-corporate-benefit-2": "Clear and accessible information 24/7.",
            "card-corporate-benefit-3": "Strengthen client trust.",
            "card-learn-more": "Learn more &rarr;",

            // Profile Switcher Labels
            "btn-profile-creativo": "Visual / Artistic Profile",
            "btn-profile-corporativo": "Technical / Consultant Profile",
            
            // Solutions Cards Detail
            "services-badge": "OUR SOLUTIONS",
            "services-title": "Digital solutions without technical fluff",
            "services-subtitle": "We design fast, straightforward portals to solve the most common business pains for entrepreneurs in Cuba.",
            "card1-title": "Ordering Catalogs",
            "card1-desc": "Turn your WhatsApp into an organized and automated sales channel.",
            "card1-b1": "✔ Structured orders sent directly to your chat",
            "card1-b2": "✔ Ultra-fast load times even on slow mobile data",
            "card1-b3": "✔ Zero monthly hosting fees or software licenses",
            "card2-title": "Portfolios & Resumes",
            "card2-desc": "Showcase your talent and command higher rates locally or abroad.",
            "card2-b1": "✔ Perfect for photographers, artists, models & professionals",
            "card2-b2": "✔ Optimized galleries that consume minimum data",
            "card2-b3": "✔ Premium international-grade personal branding",
            "card3-title": "Corporate Pages",
            "card3-desc": "The institutional credibility your service business needs to close big contracts.",
            "card3-b1": "✔ Your custom .com domain and Google visibility",
            "card3-b2": "✔ Professional email accounts (@yourcompany.com)",
            "card3-b3": "✔ Clean display of services, team, and portfolio projects",
            "card-cta": "View solution details →",
            
            // --- Method / Process Section (3 steps optimized) ---
            "process-badge": "Our Method",
            "process-title": "Your online presence in 3 steps",
            "process-subtitle": "An optimized and transparent workflow to bring your business into the digital environment professionally.",
            "step1-title": "Strategy & Discoverability",
            "step1-desc": "We audit your business and write persuasive copy. We design the optimal structure so new clients and suppliers find you first on Google easily.",
            "step2-title": "Clean Code & Self-Management",
            "step2-desc": "We build your site in raw HTML/JS. It is ultra-fast on mobile data, and we teach you how to update your products, prices, and images yourself.",
            "step3-title": "Launch & $0 Hosting",
            "step3-desc": "We link your WhatsApp and custom domain, launching your platform with zero monthly server costs.",
            
            // --- Who We Are Section (Premium B2B Trust Builder) ---
            "about-badge": "WHO WE ARE",
            "about-title": "Why Choose Trazio Studio",
            "about-text": "We are not just web designers. Our background in corporate finance, accounting, and administrative systems (like Odoo) allows us to understand your business from the inside. We don't just build pretty pages; we engineer logical tools designed to reduce your operational costs, eliminate order chaos, and multiply your business credibility.",

            // --- Interactive Demo Previews ---
            "demo-badge": "Live Preview",
            "demo-title": "Explore our solutions",
            "demo-subtitle": "Take a look at how your tools will look. Interfaces designed with pixel precision, built for conversion and usability.",
            "demo-tab-catalog": "Mobile Catalog",
            "demo-tab-portfolio": "Creative Portfolio",
            "demo-tab-corporate": "Corporate Site",
            "demo-cta-catalog": "Try Live Demo &rarr;",
            "demo-cta-portfolio": "Try Portfolio Demo &rarr;",
            "demo-cta-corporate": "Try Corporate Demo &rarr;",
            
            // Mockup Element Texts
            "mock-cat-title": "Fashion Atelier",
            "mock-cat-subtitle": "Spring-Summer Collection",
            "mock-cat-prod-1-name": "Sand Linen Dress",
            "mock-cat-prod-1-price": "$35.00 USD",
            "mock-cat-prod-2-name": "Sun Straw Hat",
            "mock-cat-prod-2-price": "$18.00 USD",
            "mock-cat-cart-total": "Total: $53.00 USD",
            "mock-cat-whatsapp-btn": "Send order to WhatsApp",
            
            "mock-port-title": "Raul Silva",
            "mock-port-subtitle": "Architecture & Interior Photography",
            "mock-port-tag-1": "Composition",
            "mock-port-tag-2": "Minimalism",
            "mock-port-tag-3": "Natural Light",
            "mock-port-view-gallery": "View Full Project &rarr;",
            
            "mock-corp-name": "Constructa LLC",
            "mock-corp-badge": "ENGINEERING & DESIGN STUDIO",
            "mock-corp-hero-title": "We build structures with a legacy of excellence.",
            "mock-corp-metric-1-num": "15+",
            "mock-corp-metric-1-label": "Years in Cuba",
            "mock-corp-metric-2-num": "80+",
            "mock-corp-metric-2-label": "Projects Completed",
            "mock-corp-contact-btn": "Schedule Direct Consultation",

            // --- FAQ Section ---
            "faq-badge": "FAQ",
            "faq-title": "Answering your questions",
            "faq-subtitle": "Clear and direct answers to the most common questions about our solutions.",
            "faq-q1": "Why don't you use WordPress?",
            "faq-a1": "WordPress is slow and requires constant maintenance. Our pure HTML/JS static code loads instantly on mobile networks in Cuba, is 100% secure, and never breaks.",
            "faq-q2": "What does 'free hosting for life' mean?",
            "faq-a2": "Because we don't use heavy databases, we host your site on high-performance cloud servers for free. Your monthly server hosting cost will be $0 forever.",
            "faq-q3": "How do I receive customer orders?",
            "faq-a3": "Customers browse your catalog, select products, and upon clicking the button, a perfectly formatted WhatsApp message is generated with their name, products, counts, and the total subtotal.",
            "faq-q4": "What payment methods do you accept?",
            "faq-a4": "We accept direct payments via Zelle, TropiPay, cryptocurrencies (USDT), and national transfers to streamline operations for local businesses.",

            // --- Footer ---
            "footer-tagline": "We build high-speed web tools to optimize your business operations.",
            "footer-aida-text": "Ready to grow your business?",
            "footer-aida-desc": "Write to us and send your catalog, price list, or idea via WhatsApp. We will prepare an interactive demo completely free and tailored to your sector in less than 24 hours.",
            "footer-aida-cta": "REQUEST FREE DEMONSTRATION",
            "footer-microcopy": "<span class='text-custom-accent'>✔</span> No technical cost, commitments, or maintenance contracts."
        }
    };

    // --- COMENTARIO: Gestión del Estado de Temas (Claro / Oscuro) con Persistencia ---
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark');
            if (themeIconMoon) themeIconMoon.classList.add('hidden');
            if (themeIconSun) themeIconSun.classList.remove('hidden');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark');
            if (themeIconMoon) themeIconMoon.classList.remove('hidden');
            if (themeIconSun) themeIconSun.classList.add('hidden');
        }
    };

    const toggleTheme = () => {
        let currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    // --- COMENTARIO: Motor Dinámico de Traducción (Maneja fallos de data attributes o typos) ---
    const translatePage = (lang) => {
        // Encontrar todos los elementos que tengan data-i18n, dataa-i18n o dataa_i18n
        const elementsToTranslate = document.querySelectorAll('[data-i18n], [dataa-i18n], [dataa_i18n]');
        
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-i18n') || element.getAttribute('dataa-i18n') || element.getAttribute('dataa_i18n');
            if (translations[lang] && translations[lang][key]) {
                const translationText = translations[lang][key];

                // Manejo especial para elementos de formulario e inputs
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translationText);
                } else if (element.tagName === 'SELECT') {
                    // Actualizar el texto por defecto de la opción deshabilitada (placeholder)
                    const placeholderOption = element.querySelector('option[disabled]');
                    if (placeholderOption) {
                        placeholderOption.textContent = translationText;
                    }
                } else {
                    // Permitir inyección de etiquetas HTML para estilos de acento o saltos
                    element.innerHTML = translationText;
                }
            }
        });

        // Actualizar visualmente el indicador de idioma en la barra superior
        if (currentLangDisplay) {
            currentLangDisplay.textContent = lang.toUpperCase();
        }
        document.documentElement.lang = lang; // Actualiza el atributo lang nativo del documento
    };

    const toggleLanguage = () => {
        let currentLang = localStorage.getItem('language') || 'es';
        const newLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', newLang);
        translatePage(newLang);
    };

    // --- COMENTARIO: Configuración e Inicialización en Carga Primaria ---

    // Asignar dinámicamente el año de copyright en el pie de página
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Inicializar el tema basado en la memoria del navegador o el predeterminado oscuro
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    
    // Forzar modo oscuro si no hay tema guardado
    if (!localStorage.getItem('theme')) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark');
        if (themeIconMoon) themeIconMoon.classList.remove('hidden');
        if (themeIconSun) themeIconSun.classList.add('hidden');
    }

    // Inicializar traducción basada en el idioma anterior o predeterminado (Español)
    const savedLanguage = localStorage.getItem('language') || 'es';
    translatePage(savedLanguage);

    // --- COMENTARIO: Inicialización del Estado Visual del Doble Espejo ---
    const inicializarDobleEspejo = () => {
        const seccionCreativa = document.getElementById('seccion-creativa');
        const seccionTecnica = document.getElementById('seccion-tecnica');
        
        const btnCreativo = document.getElementById('btn-profile-creativo');
        const btnTecnico = document.getElementById('btn-profile-corporativo');
        const btnCreativoMob = document.getElementById('btn-profile-creativo-mobile');
        const btnTecnicoMob = document.getElementById('btn-profile-corporativo-mobile');

        const activeClasses = ['bg-custom-main', 'text-custom-accent', 'border', 'border-custom-accent/30', 'shadow-md'];
        const inactiveClasses = ['text-custom-muted', 'border-transparent'];

        if (seccionCreativa && seccionTecnica) {
            seccionCreativa.classList.remove('hidden');
            seccionTecnica.classList.add('hidden'); // Asegurar perfil técnico oculto al inicio

            // Forzar estados visuales de botones activos
            if (btnCreativo) { btnCreativo.classList.remove(...inactiveClasses); btnCreativo.classList.add(...activeClasses); }
            if (btnCreativoMob) { btnCreativoMob.classList.remove(...inactiveClasses); btnCreativoMob.classList.add(...activeClasses); }
            
            // Forzar estados visuales de botones inactivos
            if (btnTecnico) { btnTecnico.classList.remove(...activeClasses); btnTecnico.classList.add(...inactiveClasses); }
            if (btnTecnicoMob) { btnTecnicoMob.classList.remove(...activeClasses); btnTecnicoMob.classList.add(...inactiveClasses); }
        }
    };
    inicializarDobleEspejo();

    // --- COMENTARIO: Lógica de la Galería de Demostraciones (Cambio de Pestañas) ---
    const tabButtons = document.querySelectorAll('.demo-tab-btn');
    const demoPanes = document.querySelectorAll('.demo-content-pane');

    if (tabButtons && tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-demo-target');

                tabButtons.forEach(btn => {
                    btn.classList.remove('text-custom-accent', 'bg-custom-main', 'border', 'border-custom-accent/20', 'shadow-md');
                    btn.classList.add('text-custom-muted', 'hover:text-custom-main');
                });

                button.classList.add('text-custom-accent', 'bg-custom-main', 'border', 'border-custom-accent/20', 'shadow-md');
                button.classList.remove('text-custom-muted', 'hover:text-custom-main');

                if (demoPanes) {
                    demoPanes.forEach(pane => {
                        pane.classList.add('hidden');
                        pane.classList.remove('block', 'opacity-100', 'scale-100');
                        pane.classList.add('opacity-0', 'scale-95');
                    });
                }

                const activePane = document.getElementById(target);
                if (activePane) {
                    activePane.classList.remove('hidden');
                    activePane.classList.add('block');
                    setTimeout(() => {
                        activePane.classList.remove('opacity-0', 'scale-95');
                        activePane.classList.add('opacity-100', 'scale-100');
                    }, 20);
                }
            });
        });
    }

    // --- COMENTARIO: Acordeón FAQ ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems && accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.accordion-icon');

            if (header) {
                header.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');

                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherContent = otherItem.querySelector('.accordion-content');
                            if (otherContent) otherContent.style.maxHeight = null;
                            const otherIcon = otherItem.querySelector('.accordion-icon');
                            if (otherIcon) otherIcon.classList.remove('rotate-45');
                        }
                    });

                    if (wasActive) {
                        item.classList.remove('active');
                        if (content) content.style.maxHeight = null;
                        if (icon) icon.classList.remove('rotate-45');
                    } else {
                        item.classList.add('active');
                        if (content) content.style.maxHeight = content.scrollHeight + "px";
                        if (icon) icon.classList.add('rotate-45');
                    }
                });
            }
        });
    }

    // --- COMENTARIO: Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim() || '';
            const business = document.getElementById('business')?.value.trim() || '';
            const whatsapp = document.getElementById('whatsapp')?.value.trim() || '';
            const solution = document.getElementById('solution')?.value.trim() || '';

            if (!name || !business || !whatsapp || !solution) {
                alert('Por favor, rellene todos los campos.');
                return;
            }

            const message = encodeURIComponent(
                `Hola Trazio Studio, quiero agendar mi auditoría digital para ${business}. ` +
                `Mi nombre es ${name}, mi número de WhatsApp es ${whatsapp}, y me interesa la solución: ${solution}.`
            );
            window.open(`https://wa.me/5350000000?text=${message}`, '_blank');
            contactForm.reset();
        });
    }

 // --- COMENTARIO: Escuchadores del Sistema (Temas e Idiomas) ---
    if (themeSwitcher) themeSwitcher.addEventListener('click', toggleTheme);
    if (languageToggle) languageToggle.addEventListener('click', toggleLanguage);

    // --- COMENTARIO: Unificación de Eventos Dinámicos de Click (Calendarios) ---
    document.addEventListener('click', (e) => {
        
        // 1. Calendario Creativo
        const creativeDay = e.target.closest('.calendar-day');
        if (creativeDay) {
            const activeDay = document.querySelector('.calendar-day-active');
            if (activeDay) {
                activeDay.classList.remove('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-active');
            }
            creativeDay.classList.add('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-active');
            return;
        }

        // 2. Calendario Técnico
        const techDay = e.target.closest('.calendar-day-tech');
        if (techDay) {
            const activeTechDay = document.querySelector('.calendar-day-tech-active');
            if (activeTechDay) {
                activeTechDay.classList.remove('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-tech-active');
            }
            techDay.classList.add('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-tech-active');
            return;
        }
    });

    // --- COMENTARIO: Selector de Rubros (Identidad Corporativa) ---
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
        const buttons = industrySelector.querySelectorAll('button');
        const panels = document.querySelectorAll('.demo-panel');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Resetear todos los botones a inactivos
                buttons.forEach(b => {
                    b.classList.remove('bg-custom-accent', 'text-black');
                    b.classList.add('bg-custom-card', 'border', 'border-custom/20', 'text-custom-muted');
                });
                // 2. Activar el botón clickeado
                btn.classList.remove('bg-custom-card', 'border', 'border-custom/20', 'text-custom-muted');
                btn.classList.add('bg-custom-accent', 'text-black');
                // 3. Ocultar todos los paneles
                panels.forEach(p => {
                    p.classList.remove('block');
                    p.classList.add('hidden');
                });
                // 4. Mostrar el panel objetivo
                const targetId = btn.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.remove('hidden');
                    targetPanel.classList.add('block');
                }
            });
        });
    }
// --- COMENTARIO: Selector de Rubros (Catálogos) ---
    const catalogSelector = document.getElementById('catalog-industry-selector');
    if (catalogSelector) {
        const buttons = catalogSelector.querySelectorAll('button');
        const panels = document.querySelectorAll('#catalog-demo-wrapper > div');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => {
                    b.classList.remove('bg-custom-accent', 'text-black');
                    b.classList.add('bg-custom-card', 'border', 'border-custom/20', 'text-custom-muted');
                });
                btn.classList.remove('bg-custom-card', 'border', 'border-custom/20', 'text-custom-muted');
                btn.classList.add('bg-custom-accent', 'text-black');

                panels.forEach(p => {
                    p.classList.remove('block');
                    p.classList.add('hidden');
                });

                const targetId = btn.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.remove('hidden');
                    targetPanel.classList.add('block');
                }
            });
        });
    }

    // --- COMENTARIO: API de Compartir Nativa ---
    const btnShare = document.getElementById('btn-share-catalog');
    if (btnShare) {
        btnShare.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Mi Catálogo Digital',
                        text: 'Mira nuestros productos y haz tu pedido por WhatsApp:',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error al compartir:', err);
                }
            } else {
                alert('La función de compartir no está soportada en este navegador de escritorio. Úsala en tu móvil.');
            }
        });
    }

    // --- COMENTARIO: Modal QR (Simulación) ---
    const btnQR = document.getElementById('btn-qr-catalog');
    if (btnQR) {
        btnQR.addEventListener('click', () => {
            alert('En la versión final, esto abrirá un modal con un Código QR listo para imprimir y poner en las mesas de tu local.');
        });
    }

}); // Cierre seguro del DOMContentLoaded global