/* ============================================================
   TRAZIO STUDIO — Script Principal Unificado
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const languageToggle = document.getElementById('language-toggle');
    const currentLangDisplay = document.getElementById('current-lang-display');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const themeIconSun = document.getElementById('theme-icon-sun');

    // --- Gestión del Estado de Temas ---
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

    // --- Configuración e Inicialización en Carga Primaria ---
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    if (!localStorage.getItem('theme')) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark');
        if (themeIconMoon) themeIconMoon.classList.remove('hidden');
        if (themeIconSun) themeIconSun.classList.add('hidden');
    }

    // --- Acordeón FAQ ---
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

    // --- Formulario de Contacto ---
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
            window.open(`https://wa.me/5353200426?text=${message}`, '_blank');
            contactForm.reset();
        });
    }

    // --- Escuchadores del Sistema ---
    if (themeSwitcher) themeSwitcher.addEventListener('click', toggleTheme);

    // --- Calendarios ---
    document.addEventListener('click', (e) => {
        const creativeDay = e.target.closest('.calendar-day');
        if (creativeDay) {
            const activeDay = document.querySelector('.calendar-day-active');
            if (activeDay) activeDay.classList.remove('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-active');
            creativeDay.classList.add('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-active');
            return;
        }
        const techDay = e.target.closest('.calendar-day-tech');
        if (techDay) {
            const activeTechDay = document.querySelector('.calendar-day-tech-active');
            if (activeTechDay) activeTechDay.classList.remove('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-tech-active');
            techDay.classList.add('bg-custom-accent', 'text-black', 'font-bold', 'calendar-day-tech-active');
            return;
        }
    });

    // --- Lógica del Header ---
    const btnMenu = document.getElementById('mobile-menu-btn');
    const panelMenu = document.getElementById('mobile-menu');
    const backdropMenu = document.getElementById('mobile-menu-backdrop');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    function openMenu() {
        if (!panelMenu) return;
        panelMenu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
        if (backdropMenu) backdropMenu.classList.remove('hidden');
        if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
        if (btnMenu) btnMenu.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        if (!panelMenu) return;
        panelMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
        if (backdropMenu) backdropMenu.classList.add('hidden');
        if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        if (btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            btnMenu.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
        });
    }
    if (backdropMenu) backdropMenu.addEventListener('click', closeMenu);

    const wrapperDD = document.querySelector('[data-dropdown]');
    if (wrapperDD) {
        const triggerDD = wrapperDD.querySelector('.dropdown-trigger');
        const ddPanel = wrapperDD.querySelector('.dropdown-panel');
        const chevron = wrapperDD.querySelector('.dropdown-chevron');
        function openDD() {
            if (ddPanel) ddPanel.classList.remove('opacity-0', 'invisible', '-translate-y-2');
            if (triggerDD) triggerDD.setAttribute('aria-expanded', 'true');
            if (chevron) chevron.classList.add('rotate-180');
        }
        function closeDD() {
            if (ddPanel) ddPanel.classList.add('opacity-0', 'invisible', '-translate-y-2');
            if (triggerDD) triggerDD.setAttribute('aria-expanded', 'false');
            if (chevron) chevron.classList.remove('rotate-180');
        }
        if (triggerDD) {
            triggerDD.addEventListener('click', (e) => {
                e.stopPropagation();
                triggerDD.getAttribute('aria-expanded') === 'true' ? closeDD() : openDD();
            });
        }
        document.addEventListener('click', (e) => {
            if (!wrapperDD.contains(e.target)) closeDD();
        });
    }

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
        if (triggerDD) triggerDD.classList.add('text-custom-accent');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // A PARTIR DE AQUÍ: las 2 demos interactivas, cada una en su propio IIFE
    // con su propia raíz de búsqueda (querySelector siempre parte de la raíz
    // de la sección, nunca de `document`). Esto es lo que faltaba: antes
    // ambas demos usaban las mismas clases (.demo-tab-btn, .cart-item, etc.)
    // y los mismos IDs de QR/Compartir, y varios handlers competían por los
    // mismos elementos. Ahora cada bloque hace `if (!root) return;` y sale
    // de inmediato si esa sección no existe en la página actual — así en
    // catalogo-pedidos.html solo corre el bloque 1, en el home solo el 2,
    // y nunca se pisan aunque compartan clases o el mismo main.js.
    // ═══════════════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────────────────────────────────
    // 1) DEMO — Catálogo de Pedidos (catalogo-pedidos.html)
    //    Raíz: #catalog-industry-selector (tabs) + #catalog-demo-wrapper (paneles)
    // ─────────────────────────────────────────────────────────────────────
    (function initCatalogPageDemo() {
        const tabsRoot = document.getElementById('catalog-industry-selector');
        const demoWrapper = document.getElementById('catalog-demo-wrapper');
        if (!tabsRoot || !demoWrapper) return; // esta página no tiene esta sección

        const formatMoney = (n) => '$' + n.toFixed(2);

        function recalcPanel(panel) {
            let total = 0;
            let units = 0;

            panel.querySelectorAll('.cart-item').forEach((item) => {
                const price = parseFloat(item.dataset.price) || 0;
                const qty = parseInt(item.dataset.qty || '0', 10);
                if (qty > 0) {
                    total += price * qty;
                    units += qty;
                    item.classList.remove('opacity-60');
                } else {
                    item.classList.add('opacity-60');
                }
            });

            const badge = panel.querySelector('.cart-badge-count');
            if (badge) badge.textContent = String(units);

            const totalEl = panel.querySelector('.cart-total-value');
            if (totalEl) totalEl.textContent = formatMoney(total);

            updateWaLink(panel, total);
        }

        function updateWaLink(panel, total) {
            const link = panel.querySelector('.wa-order-btn');
            if (!link) return;

            const base = link.dataset.waBase || '';
            const prefix = link.dataset.waPrefix || '';
            const lines = [];

            panel.querySelectorAll('.cart-item').forEach((item) => {
                const qty = parseInt(item.dataset.qty || '0', 10);
                if (qty <= 0) return;
                const name = item.dataset.name || '';
                const price = parseFloat(item.dataset.price) || 0;
                const isToggle = item.dataset.mode === 'toggle';
                const sub = (price * qty).toFixed(2);
                lines.push('- ' + name + (isToggle ? '' : ' x' + qty) + ' ($' + sub + ')');
            });

            const message = prefix + '\n' + lines.join('\n') + '\nTotal: ' + formatMoney(total);
            link.setAttribute('href', base + '?text=' + encodeURIComponent(message));
        }

        function setQty(item, qty) {
            qty = Math.max(0, qty);
            item.dataset.qty = String(qty);
            const display = item.querySelector('.cart-qty-display');
            if (display) display.textContent = String(qty);
            const panel = item.closest('.demo-panel');
            if (panel) recalcPanel(panel);
        }

        function toggleItem(item, btn) {
            const wasAdded = item.dataset.qty === '1';
            setQty(item, wasAdded ? 0 : 1);

            btn.setAttribute('aria-pressed', String(!wasAdded));
            btn.classList.toggle('bg-custom-accent', !wasAdded);
            btn.classList.toggle('text-black', !wasAdded);
            btn.classList.toggle('border', wasAdded);
            btn.classList.toggle('border-custom', wasAdded);
            btn.classList.toggle('text-custom-muted', wasAdded);

            const iconCheck = btn.querySelector('.icon-check');
            const iconPlus = btn.querySelector('.icon-plus');
            if (iconCheck) iconCheck.classList.toggle('hidden', wasAdded);
            if (iconPlus) iconPlus.classList.toggle('hidden', !wasAdded);
            btn.setAttribute('aria-label', wasAdded ? 'Agregar servicio' : 'Quitar reserva');
        }

        demoWrapper.addEventListener('click', (e) => {
            const plusBtn = e.target.closest('.cart-qty-plus');
            const minusBtn = e.target.closest('.cart-qty-minus');
            const toggleBtn = e.target.closest('.cart-toggle-btn');

            if (plusBtn) {
                const item = plusBtn.closest('.cart-item');
                setQty(item, parseInt(item.dataset.qty || '0', 10) + 1);
            } else if (minusBtn) {
                const item = minusBtn.closest('.cart-item');
                setQty(item, parseInt(item.dataset.qty || '0', 10) - 1);
            } else if (toggleBtn) {
                const item = toggleBtn.closest('.cart-item');
                toggleItem(item, toggleBtn);
            }
        });

        // Tabs — escopeados a tabsRoot, NUNCA a document, para no tocar
        // los botones .demo-tab-btn de la galería del home
        const tabButtons = tabsRoot.querySelectorAll('.demo-tab-btn');
        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.demoTarget;

                tabButtons.forEach((b) => {
                    const active = b === btn;
                    b.setAttribute('aria-selected', String(active));
                    b.classList.toggle('bg-custom-accent', active);
                    b.classList.toggle('text-black', active);
                    b.classList.toggle('bg-custom-card', !active);
                    b.classList.toggle('border', !active);
                    b.classList.toggle('border-custom', !active);
                    b.classList.toggle('text-custom-muted', !active);
                });

                demoWrapper.querySelectorAll('.demo-panel').forEach((panel) => {
                    panel.classList.toggle('hidden', panel.id !== targetId);
                });
            });
        });

        demoWrapper.querySelectorAll('.demo-panel').forEach(recalcPanel);
    })();

// ... todo el código anterior igual hasta initHomeGalleryDemo ...

    // ─────────────────────────────────────────────────────────────────────
    // 2) DEMO — Galería del Home (#demo-gallery: Catálogo/Portafolio/Corporativo)
    //    Raíz: #demo-gallery — todo se busca dentro de `gallery`, nunca de `document`
    // ─────────────────────────────────────────────────────────────────────
    (function initHomeGalleryDemo() {
        const gallery = document.getElementById('demo-gallery');
        if (!gallery) return; // esta página no tiene esta sección

        const formatMoneyUsd = (n) => '$' + n.toFixed(2) + ' USD';

        // --- Tabs con crossfade, escopeados a `gallery` ---
        const tabButtons = gallery.querySelectorAll('.demo-tab-btn');
        const panes = gallery.querySelectorAll('.demo-content-pane');

        function activateGalleryTab(targetId) {
            tabButtons.forEach((b) => {
                const active = b.dataset.demoTarget === targetId;
                b.setAttribute('aria-selected', String(active));
                b.classList.toggle('bg-custom-accent', active);
                b.classList.toggle('text-black', active);
                b.classList.toggle('shadow-md', active);
                b.classList.toggle('border', active);
                b.classList.toggle('border-custom-accent/20', active);
                b.classList.toggle('text-custom-muted', !active);
            });

            panes.forEach((pane) => {
                if (pane.id === targetId) {
                    pane.classList.remove('hidden');
                    void pane.offsetWidth; // fuerza reflow antes de animar entrada
                    pane.classList.remove('opacity-0', 'scale-95');
                    pane.classList.add('opacity-100', 'scale-100');
                } else if (!pane.classList.contains('hidden')) {
                    pane.classList.remove('opacity-100', 'scale-100');
                    pane.classList.add('opacity-0', 'scale-95');
                    setTimeout(() => {
                        if (pane.id !== targetId) pane.classList.add('hidden');
                    }, 350);
                }
            });
        }

        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => activateGalleryTab(btn.dataset.demoTarget));
        });

        // --- Quick-add del panel "Catálogo Móvil", escopeado a #catalog-demo ---
        const catalogPane = gallery.querySelector('#catalog-demo');

        function recalcCatalog() {
            if (!catalogPane) return;
            let total = 0;
            let units = 0;

            catalogPane.querySelectorAll('.cart-item').forEach((item) => {
                const price = parseFloat(item.dataset.price) || 0;
                const qty = parseInt(item.dataset.qty || '0', 10);
                
                // Aplicar opacidad según si hay cantidad o no
                item.classList.toggle('opacity-60', qty === 0);
                
                if (qty > 0) {
                    total += price * qty;
                    units += qty;
                }
            });

            const badge = catalogPane.querySelector('.cart-badge-count');
            if (badge) badge.textContent = String(units);

            const totalEl = catalogPane.querySelector('.cart-total-value');
            if (totalEl) totalEl.textContent = formatMoneyUsd(total);

            updateGalleryWaLink(total);
        }

        function updateGalleryWaLink(total) {
            const link = catalogPane.querySelector('.wa-order-btn');
            if (!link) return;
            const base = link.dataset.waBase || '';
            const prefix = link.dataset.waPrefix || '';
            const lines = [];

            catalogPane.querySelectorAll('.cart-item').forEach((item) => {
                const qty = parseInt(item.dataset.qty || '0', 10);
                const name = item.dataset.name || '';
                const price = parseFloat(item.dataset.price) || 0;
                if (qty > 0) {
                    const subtotal = (price * qty).toFixed(2);
                    lines.push(`- ${name} x${qty} ($${subtotal})`);
                }
            });

            const message = prefix + '\n' + lines.join('\n') + '\nTotal: ' + formatMoneyUsd(total);
            link.setAttribute('href', base + '?text=' + encodeURIComponent(message));
        }

        function setQty(item, qty) {
            qty = Math.max(0, qty);
            item.dataset.qty = String(qty);
            
            const display = item.querySelector('.cart-qty-display');
            if (display) display.textContent = String(qty);
            
            recalcCatalog();
        }

        if (catalogPane) {
            catalogPane.addEventListener('click', (e) => {
                const plusBtn = e.target.closest('.cart-qty-plus');
                const minusBtn = e.target.closest('.cart-qty-minus');

                if (plusBtn) {
                    const item = plusBtn.closest('.cart-item');
                    if (item) {
                        const currentQty = parseInt(item.dataset.qty || '0', 10);
                        setQty(item, currentQty + 1);
                    }
                } else if (minusBtn) {
                    const item = minusBtn.closest('.cart-item');
                    if (item) {
                        const currentQty = parseInt(item.dataset.qty || '0', 10);
                        setQty(item, currentQty - 1);
                    }
                }
            });
            recalcCatalog(); // estado inicial
        }
    })();

    // ─────────────────────────────────────────────────────────────────────
    // 3) COMPARTIR + MODAL QR — ÚNICA implementación, compartida por ambas
    //    páginas. Cada página trae solo UNA instancia de #modal-qr /
    //    #btn-share-catalog / #btn-qr-catalog
    // ─────────────────────────────────────────────────────────────────────
    (function initShareAndQr() {
        const modal = document.getElementById('modal-qr');
        const btnOpenQr = document.getElementById('btn-qr-catalog');
        const btnCloseQr = document.getElementById('close-modal-qr');
        const btnCloseQr2 = document.getElementById('close-modal-qr-secondary');
        const btnDownloadQr = document.getElementById('download-qr-btn');
        const btnShare = document.getElementById('btn-share-catalog');

        function openModal() {
            if (!modal) return;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }

        if (btnOpenQr) btnOpenQr.addEventListener('click', openModal);
        if (btnCloseQr) btnCloseQr.addEventListener('click', closeModal);
        if (btnCloseQr2) btnCloseQr2.addEventListener('click', closeModal);
        if (modal) {
            modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
        });

        if (btnDownloadQr) {
            btnDownloadQr.addEventListener('click', () => {
                const svg = document.getElementById('qr-svg') || (modal && modal.querySelector('svg'));
                const label = btnDownloadQr.querySelector('.download-label');
                const icon = btnDownloadQr.querySelector('.download-icon');
                const check = btnDownloadQr.querySelector('.check-icon-download');

                if (svg) {
                    const svgMarkup = '<?xml version="1.0" encoding="UTF-8"?>\n' + svg.outerHTML;
                    const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'trazio-qr-catalogo.svg';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                }

                if (icon) icon.classList.add('hidden');
                if (check) check.classList.remove('hidden');
                if (label) label.textContent = '¡Descargado!';
                setTimeout(() => {
                    if (icon) icon.classList.remove('hidden');
                    if (check) check.classList.add('hidden');
                    if (label) label.textContent = 'Descargar QR (SVG)';
                }, 2000);
            });
        }

        if (btnShare) {
            btnShare.addEventListener('click', async () => {
                const shareData = { title: document.title, url: window.location.href };
                const toast = btnShare.querySelector('.share-toast');

                try {
                    if (navigator.share) {
                        await navigator.share(shareData);
                        return;
                    }
                    await navigator.clipboard.writeText(shareData.url);
                } catch (err) {
                    return;
                }

                if (toast) {
                    toast.classList.remove('opacity-0');
                    toast.classList.add('opacity-100');
                    setTimeout(() => {
                        toast.classList.remove('opacity-100');
                        toast.classList.add('opacity-0');
                    }, 1800);
                } else {
                    alert('¡Enlace copiado al portapapeles!');
                }
            });
        }
    })();

}); // Cierre del DOMContentLoaded global