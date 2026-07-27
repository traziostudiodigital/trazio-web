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
            window.open(`https://wa.me/5350000000?text=${message}`, '_blank');
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

    // ─────────────────────────────────────────────────────────────────────────
    // --- DEMO INTERACTIVA DE CATÁLOGOS (NUEVA LÓGICA OPTIMIZADA) ---
    // ─────────────────────────────────────────────────────────────────────────
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

    const demoWrapper = document.getElementById('catalog-demo-wrapper');
    const tabButtons = document.querySelectorAll('.demo-tab-btn');

    if (demoWrapper) {
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
    }

    if (tabButtons.length > 0) {
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

                document.querySelectorAll('.demo-panel').forEach((panel) => {
                    panel.classList.toggle('hidden', panel.id !== targetId);
                });
            });
        });
    }

    // Inicialización de paneles
    document.querySelectorAll('.demo-panel').forEach(recalcPanel);

    // ─────────────────────────────────────────────────────────────────────────
    // --- COMPARTIR Y MODAL DE QR (Añadido/Verificado) ---
    // ─────────────────────────────────────────────────────────────────────────
    const shareBtn = document.getElementById('btn-share-catalog');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Catálogo de Ventas por WhatsApp',
                        url: window.location.href
                    });
                } catch (err) { /* Cancelado por el usuario */ }
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace del catálogo copiado al portapapeles!');
            }
        });
    }

    const btnQr = document.getElementById('btn-qr-catalog');
    const modalQr = document.getElementById('modal-qr');
    const closeQr = document.getElementById('close-modal-qr');

    if (btnQr && modalQr) {
        btnQr.addEventListener('click', () => modalQr.classList.remove('hidden'));
    }
    if (closeQr && modalQr) {
        closeQr.addEventListener('click', () => modalQr.classList.add('hidden'));
    }
    if (modalQr) {
        modalQr.addEventListener('click', (e) => {
            if (e.target === modalQr) modalQr.classList.add('hidden');
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // --- Gallery Tabs ---
    // ─────────────────────────────────────────────────────────────────────────
    const galleryTabs = document.getElementById('gallery-tabs');
    if (galleryTabs) {
        function switchGalleryPane(targetId) {
            const currentPane = document.querySelector('#demo-gallery .demo-content-pane.block');
            const nextPane = document.getElementById(targetId);
            if (!nextPane || currentPane === nextPane) return;

            if (currentPane) {
                currentPane.classList.remove('block', 'opacity-100', 'scale-100');
                currentPane.classList.add('opacity-0', 'scale-95');
            }

            nextPane.classList.remove('block', 'opacity-100', 'scale-100');
            nextPane.classList.add('hidden', 'opacity-0', 'scale-95');

            setTimeout(function() {
                if (currentPane) {
                    currentPane.classList.remove('block', 'opacity-100', 'scale-100');
                    currentPane.classList.add('hidden', 'opacity-0', 'scale-95');
                }

                nextPane.classList.remove('hidden', 'opacity-0', 'scale-95');
                nextPane.classList.add('block');
                void nextPane.offsetWidth;
                nextPane.classList.add('opacity-100', 'scale-100');
            }, currentPane ? 200 : 0);
        }

        galleryTabs.addEventListener('click', function(e) {
            const btn = e.target.closest('button[data-demo-target]');
            if (!btn) return;
            galleryTabs.querySelectorAll('button[data-demo-target]').forEach(function(b) {
                const isActive = b === btn;
                b.classList.toggle('text-custom-accent', isActive);
                b.classList.toggle('bg-custom-main', isActive);
                b.classList.toggle('border', isActive);
                b.classList.toggle('border-custom-accent/20', isActive);
                b.classList.toggle('shadow-md', isActive);
                b.classList.toggle('text-custom-muted', !isActive);
                b.classList.toggle('hover:text-custom-accent', !isActive);
                b.setAttribute('aria-selected', isActive.toString());
            });
            switchGalleryPane(btn.getAttribute('data-demo-target'));
        });

        const catalogPane = document.getElementById('catalog-demo');
        if (catalogPane) {
            const mockCart = { count: 2, total: 53.00 };
            catalogPane.addEventListener('click', function(e) {
                const addBtn = e.target.closest('.w-6.h-6.rounded-full');
                if (!addBtn) return;
                const productRow = addBtn.closest('.bg-neutral-900\\/60');
                if (!productRow) return;
                const priceEl = productRow.querySelector('.text-custom-accent');
                if (!priceEl) return;
                const priceMatch = priceEl.textContent.match(/[\d.]+/);
                if (!priceMatch) return;
                const price = parseFloat(priceMatch[0]);
                mockCart.count += 1;
                mockCart.total += price;
                const totalEl = catalogPane.querySelector('[data-i18n="mock-cat-cart-total"]');
                if (totalEl) totalEl.textContent = 'Total: $' + mockCart.total.toFixed(2) + ' USD';
                addBtn.classList.add('scale-125', 'bg-custom-accent/40');
                setTimeout(() => addBtn.classList.remove('scale-125', 'bg-custom-accent/40'), 300);
            });
        }
    }

    // --- Descarga QR ---
    const downloadQrBtn = document.getElementById('download-qr-btn');
    if (downloadQrBtn) {
        downloadQrBtn.addEventListener('click', function() {
            const label = downloadQrBtn.querySelector('.download-label');
            const dlIcon = downloadQrBtn.querySelector('.download-icon');
            const okIcon = downloadQrBtn.querySelector('.check-icon-download');
            if (!label || !dlIcon || !okIcon) return;
            const original = label.textContent;
            label.textContent = '¡Listo para imprimir!';
            dlIcon.classList.add('hidden');
            okIcon.classList.remove('hidden');
            setTimeout(function() {
                label.textContent = original;
                dlIcon.classList.remove('hidden');
                okIcon.classList.add('hidden');
            }, 1800);
        });
    }

}); // Cierre del DOMContentLoaded global