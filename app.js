 /* COMENTARIO: Esperar a que el DOM esté completamente cargado para inicializar la interactividad de Trazio Studio */
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
        // --- COMENTARIO: Lógica Completa de la Demo Interactiva de Catálogos ---
    const catalogSelector = document.getElementById('catalog-industry-selector');
    const activeTabClasses = ['bg-custom-accent', 'text-black', 'hover:scale-105'];
    const inactiveTabClasses = ['bg-custom-card', 'border', 'border-custom', 'text-custom-muted', 'hover:border-custom-accent', 'hover:text-custom-accent'];

    if (catalogSelector) {
        catalogSelector.addEventListener('click', function (e) {
            const btn = e.target.closest('button[data-demo-target]');
            if (!btn) return;

            catalogSelector.querySelectorAll('button[data-demo-target]').forEach(function (b) {
                b.setAttribute('aria-selected', 'false');
                inactiveTabClasses.forEach(c => b.classList.add(c));
                activeTabClasses.forEach(c => b.classList.remove(c));
            });

            btn.setAttribute('aria-selected', 'true');
            activeTabClasses.forEach(c => btn.classList.add(c));
            inactiveTabClasses.forEach(c => btn.classList.remove(c));

            const targetId = btn.getAttribute('data-demo-target');
            document.querySelectorAll('.demo-panel').forEach(function (panel) {
                if (panel.id === targetId) {
                    panel.classList.remove('hidden');
                    panel.classList.add('block');
                } else {
                    panel.classList.add('hidden');
                    panel.classList.remove('block');
                }
            });
        });
    }

    // Lógica interactiva del carrito en cada panel
    function formatDemoPrice(n) { return '$' + n.toFixed(2); }

    document.querySelectorAll('.demo-panel').forEach(function (panel) {
        const items = panel.querySelectorAll('.cart-item');
        const badge = panel.querySelector('.cart-badge-count');
        const totalEl = panel.querySelector('.cart-total-value');
        const waBtn = panel.querySelector('.wa-order-btn');
        const waBase = 'https://wa.me/5350000000';
        const waPrefix = waBtn ? waBtn.dataset.waPrefix : '';

        function recalcPanel() {
            let count = 0, total = 0, lines = [];
            items.forEach(function (item) {
                if (item.dataset.added === 'true') {
                    count++;
                    total += parseFloat(item.dataset.price);
                    lines.push('- ' + item.dataset.name + ' (' + formatDemoPrice(parseFloat(item.dataset.price)) + ')');
                }
            });
            if (badge) badge.textContent = count;
            if (totalEl) totalEl.textContent = formatDemoPrice(total);
            if (waBtn) {
                if (count === 0) {
                    waBtn.classList.add('opacity-40', 'pointer-events-none');
                } else {
                    waBtn.classList.remove('opacity-40', 'pointer-events-none');
                    const msg = encodeURIComponent(waPrefix + '\n' + lines.join('\n') + '\nTotal: ' + formatDemoPrice(total));
                    waBtn.href = waBase + '?text=' + msg;
                }
            }
        }

        items.forEach(function (item) {
            const btn = item.querySelector('.cart-toggle-btn');
            if (!btn) return;
            btn.addEventListener('click', function () {
                const wasAdded = item.dataset.added === 'true';
                item.dataset.added = (!wasAdded).toString();
                item.classList.toggle('opacity-60', wasAdded);
                btn.classList.toggle('bg-custom-accent', !wasAdded);
                btn.classList.toggle('text-black', !wasAdded);
                btn.classList.toggle('border', wasAdded);
                btn.classList.toggle('border-custom', wasAdded);
                btn.classList.toggle('text-custom-muted', wasAdded);

                const iconPlus = btn.querySelector('.icon-plus');
                const iconCheck = btn.querySelector('.icon-check');
                if (iconPlus) iconPlus.classList.toggle('hidden', !wasAdded);
                if (iconCheck) iconCheck.classList.toggle('hidden', wasAdded);

                btn.setAttribute('aria-pressed', (!wasAdded).toString());
                recalcPanel();
            });
        });
        recalcPanel();
    });

    // Control del Modal QR
    const modalQr = document.getElementById('modal-qr');
    const btnQrCatalog = document.getElementById('btn-qr-catalog');
    const closeQrBtn = document.getElementById('close-modal-qr');
    const closeQrXBtn = document.getElementById('close-modal-qr-x');

    function openModalQr() { if (modalQr) modalQr.classList.remove('hidden'); }
    function closeModalQr() { if (modalQr) modalQr.classList.add('hidden'); }

    if (btnQrCatalog) btnQrCatalog.addEventListener('click', openModalQr);
    if (closeQrBtn) closeQrBtn.addEventListener('click', closeModalQr);
    if (closeQrXBtn) closeQrXBtn.addEventListener('click', closeModalQr);
    if (modalQr) modalQr.addEventListener('click', function (e) { if (e.target === modalQr) closeModalQr(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModalQr(); });

    // Feedback visual al descargar QR
    const downloadQrBtn = document.getElementById('download-qr-btn');
    if (downloadQrBtn) {
        downloadQrBtn.addEventListener('click', function () {
            const label = downloadQrBtn.querySelector('.download-label');
            const dlIcon = downloadQrBtn.querySelector('.download-icon');
            const okIcon = downloadQrBtn.querySelector('.check-icon-download');
            if (!label || !dlIcon || !okIcon) return;
            const original = label.textContent;
            label.textContent = '¡Listo para imprimir!';
            dlIcon.classList.add('hidden');
            okIcon.classList.remove('hidden');
            setTimeout(function () {
                label.textContent = original;
                dlIcon.classList.remove('hidden');
                okIcon.classList.add('hidden');
            }, 1800);
        });
    }

    // Botón Compartir Catálogo
    const btnShareCatalog = document.getElementById('btn-share-catalog');
    if (btnShareCatalog) {
        btnShareCatalog.addEventListener('click', function () {
            const shareData = { title: document.title, url: location.href };
            if (navigator.share) {
                navigator.share(shareData).catch(function () {});
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(location.href).then(function () {
                    const tip = btnShareCatalog.querySelector('.share-tooltip');
                    if (!tip) return;
                    const original = tip.textContent;
                    tip.textContent = '¡Enlace copiado!';
                    tip.classList.remove('opacity-0');
                    tip.classList.add('opacity-100');
                    setTimeout(function () {
                        tip.textContent = original;
                        tip.classList.add('opacity-0');
                        tip.classList.remove('opacity-100');
                    }, 1800);
                });
            }
        });
    }
}); // Cierre seguro del DOMContentLoaded global