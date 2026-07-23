/* COMENTARIO: Esperar a que el DOM esté completamente cargado para inicializar la interactividad de Trazio Studio */
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM globales para el control visual del sitio
    const themeSwitcher = document.getElementById('theme-switcher');
    const languageToggle = document.getElementById('language-toggle');
    const currentLangDisplay = document.getElementById('current-lang-display');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const themeIconSun = document.getElementById('theme-icon-sun');

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


// --- COMENTARIO: Lógica del Header (Menú Móvil y Dropdown) ---
    const btnMenu = document.getElementById('mobile-menu-btn');
    const panelMenu = document.getElementById('mobile-menu');
    const backdropMenu = document.getElementById('mobile-menu-backdrop');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    function openMenu() {
        if(!panelMenu) return;
        panelMenu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
        if(backdropMenu) backdropMenu.classList.remove('hidden');
        if(hamburgerIcon) hamburgerIcon.classList.add('hidden');
        if(closeIcon) closeIcon.classList.remove('hidden');
        if(btnMenu) btnMenu.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        if(!panelMenu) return;
        panelMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
        if(backdropMenu) backdropMenu.classList.add('hidden');
        if(hamburgerIcon) hamburgerIcon.classList.remove('hidden');
        if(closeIcon) closeIcon.classList.add('hidden');
        if(btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    if(btnMenu) {
        btnMenu.addEventListener('click', () => {
            btnMenu.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
        });
    }
    if(backdropMenu) backdropMenu.addEventListener('click', closeMenu);
    
    const wrapperDD = document.querySelector('[data-dropdown]');
    if(wrapperDD) {
        const triggerDD = wrapperDD.querySelector('.dropdown-trigger');
        const ddPanel = wrapperDD.querySelector('.dropdown-panel');
        const chevron = wrapperDD.querySelector('.dropdown-chevron');

        function openDD() {
            if(ddPanel) ddPanel.classList.remove('opacity-0', 'invisible', '-translate-y-2');
            if(triggerDD) triggerDD.setAttribute('aria-expanded', 'true');
            if(chevron) chevron.classList.add('rotate-180');
        }
        function closeDD() {
            if(ddPanel) ddPanel.classList.add('opacity-0', 'invisible', '-translate-y-2');
            if(triggerDD) triggerDD.setAttribute('aria-expanded', 'false');
            if(chevron) chevron.classList.remove('rotate-180');
        }
        triggerDD.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerDD.getAttribute('aria-expanded') === 'true' ? closeDD() : openDD();
        });
        document.addEventListener('click', (e) => {
            if (!wrapperDD.contains(e.target)) closeDD();
        });
    }

    // Detección automática de página activa
    const path = window.location.pathname.split('/').pop() || 'index.html';
    let dropdownHasActive = false;
    document.querySelectorAll('[data-nav-link]').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('text-custom-accent');
            if (wrapperDD && wrapperDD.contains(link)) dropdownHasActive = true;
        }
    });
    if (dropdownHasActive && wrapperDD) {
        const triggerDD = wrapperDD.querySelector('.dropdown-trigger');
        if(triggerDD) triggerDD.classList.add('text-custom-accent');
    }
}); // Cierre seguro del DOMContentLoaded global