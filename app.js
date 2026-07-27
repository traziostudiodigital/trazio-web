/* COMENTARIO: Esperar a que el DOM esté completamente cargado para inicializar la interactividad de Trazio Studio */
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const languageToggle = document.getElementById('language-toggle');
    const currentLangDisplay = document.getElementById('current-lang-display');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const themeIconSun = document.getElementById('theme-icon-sun');

    // --- COMENTARIO: Gestión del Estado de Temas ---
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

    // --- COMENTARIO: Escuchadores del Sistema ---
    if (themeSwitcher) themeSwitcher.addEventListener('click', toggleTheme);

    // --- COMENTARIO: Calendarios ---
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

    // --- COMENTARIO: Lógica del Header ---
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
        triggerDD.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerDD.getAttribute('aria-expanded') === 'true' ? closeDD() : openDD();
        });
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
    // --- COMENTARIO: DEMO INTERACTIVA DE CATÁLOGOS ---
    // ─────────────────────────────────────────────────────────────────────────

    function formatDemoPrice(amount) {
        return '$' + amount.toFixed(2);
    }

    // recalcPanel: única definición, detecta modo qty vs toggle por ítem
    function recalcPanel(panel) {
        let count = 0, total = 0, lines = [];
        panel.querySelectorAll('.cart-item').forEach(function(item) {
            const qty = parseInt(item.dataset.qty) || 0;
            const added = item.dataset.added === 'true';
            const isQtyMode = item.querySelector('.cart-qty-plus') !== null;
            if (isQtyMode) {
                if (qty > 0) {
                    const price = parseFloat(item.dataset.price) || 0;
                    count += qty;
                    total += price * qty;
                    lines.push('- ' + item.dataset.name + ' x' + qty + ' (' + formatDemoPrice(price * qty) + ')');
                }
            } else {
                if (added) {
                    const price = parseFloat(item.dataset.price) || 0;
                    count++;
                    total += price;
                    lines.push('- ' + item.dataset.name + ' (' + formatDemoPrice(price) + ')');
                }
            }
        });
        const badge = panel.querySelector('.cart-badge-count');
        const totalEl = panel.querySelector('.cart-total-value');
        const waBtn = panel.querySelector('.wa-order-btn');
        if (badge) badge.textContent = count;
        if (totalEl) totalEl.textContent = formatDemoPrice(total);
        if (waBtn) {
            if (count === 0) {
                waBtn.classList.add('opacity-40', 'pointer-events-none');
            } else {
                waBtn.classList.remove('opacity-40', 'pointer-events-none');
                const base = waBtn.dataset.waBase || 'https://wa.me/TU_NUMERO_WHATSAPP';
                const prefix = waBtn.dataset.waPrefix || '';
                waBtn.href = base + '?text=' + encodeURIComponent(prefix + '\n' + lines.join('\n') + '\nTotal: ' + formatDemoPrice(total));
            }
        }
    }

// --- COMENTARIO: Tabs selector — catalog-demo.html (versión simplificada) ---
const catalogSelector = document.getElementById('catalog-industry-selector');
if (catalogSelector) {
    catalogSelector.addEventListener('click', function(e) {

        const btn = e.target.closest('button[data-demo-target]');
    if (!btn) return;

    catalogSelector.querySelectorAll('button[data-demo-target]').forEach(function(b) {
        const isActive = b === btn;
        b.setAttribute('aria-selected', isActive.toString());
        b.classList.toggle('bg-custom-accent', isActive);
        b.classList.toggle('text-black', isActive);
        b.classList.toggle('font-bold', true);
        b.classList.toggle('bg-custom-card', !isActive);
        b.classList.toggle('border', !isActive);
        b.classList.toggle('border-custom', !isActive);
        b.classList.toggle('text-custom-muted', !isActive);
        b.classList.toggle('hover:scale-105', isActive);
        b.classList.toggle('hover:border-custom-accent', !isActive);
        b.classList.toggle('hover:text-custom-accent', !isActive); // <-- Corregido el doble 'hover:'
    });

    const targetId = btn.getAttribute('data-demo-target');
    const nextPanel = document.getElementById(targetId);
    if (!nextPanel) return;

    document.querySelectorAll('#catalog-demo-wrapper .demo-panel').forEach(function(p) {
        if (p === nextPanel) {
            p.classList.remove('hidden');
            p.classList.add('block');
            p.style.display = '';
        } else {
            p.classList.add('hidden');
            p.classList.remove('block');
            p.style.display = 'none';
        }
    });
});
}
    // --- COMENTARIO: Carrito — scoped a catalog-demo-wrapper ---
    const demoWrapper = document.getElementById('catalog-demo-wrapper');
    if (demoWrapper) {
        demoWrapper.addEventListener('click', function(e) {
            const item = e.target.closest('.cart-item');
            if (!item) return;
            const panel = item.closest('.demo-panel');
            if (!panel) return;

            const plusBtn = e.target.closest('.cart-qty-plus');
            const minusBtn = e.target.closest('.cart-qty-minus');

            if (plusBtn || minusBtn) {
                let qty = parseInt(item.dataset.qty) || 0;
                if (plusBtn) qty = Math.min(qty + 1, 9);
                if (minusBtn) qty = Math.max(qty - 1, 0);
                item.dataset.qty = qty;
                item.dataset.added = qty > 0 ? 'true' : 'false';

                const display = item.querySelector('.cart-qty-display');
                if (display) display.textContent = qty;

                item.classList.toggle('opacity-60', qty === 0);

                const stepperEl = item.querySelector('.cart-qty-plus')?.closest('div');
                if (stepperEl) {
                    stepperEl.classList.toggle('border-custom-accent', qty > 0);
                    stepperEl.classList.toggle('border-custom', qty === 0);
                }

                recalcPanel(panel);
                return;
            }

            const toggleBtn = e.target.closest('.cart-toggle-btn');
            if (toggleBtn) {
                const nowAdded = item.dataset.added !== 'true';
                item.dataset.added = nowAdded.toString();
                item.classList.toggle('opacity-60', !nowAdded);
                toggleBtn.classList.toggle('bg-custom-accent', nowAdded);
                toggleBtn.classList.toggle('text-black', nowAdded);
                toggleBtn.classList.toggle('border', !nowAdded);
                toggleBtn.classList.toggle('border-custom', !nowAdded);
                toggleBtn.classList.toggle('text-custom-muted', !nowAdded);
                toggleBtn.setAttribute('aria-pressed', nowAdded.toString());
                const iconPlus = toggleBtn.querySelector('.icon-plus');
                const iconCheck = toggleBtn.querySelector('.icon-check');
                if (iconPlus) iconPlus.classList.toggle('hidden', nowAdded);
                if (iconCheck) iconCheck.classList.toggle('hidden', !nowAdded);
                recalcPanel(panel);
            }
        });
    }

    // --- COMENTARIO: Recálculo inicial único ---
    document.querySelectorAll('.demo-panel').forEach(function(panel) {
        panel.querySelectorAll('.cart-item').forEach(function(item) {
            if (item.querySelector('.cart-qty-plus')) {
                const qty = parseInt(item.dataset.qty) || 0;
                const display = item.querySelector('.cart-qty-display');
                if (display) display.textContent = qty;
                item.classList.toggle('opacity-60', qty === 0);
            }
        });
        recalcPanel(panel);
    });

    // ─────────────────────────────────────────────────────────────────────────
    // --- COMENTARIO: Gallery Tabs — index-demo-gallery.html ---
    // ─────────────────────────────────────────────────────────────────────────
    const galleryTabs = document.getElementById('gallery-tabs');
    if (galleryTabs) {
        function switchGalleryPane(targetId) {
            const currentPane = document.querySelector('#demo-gallery .demo-content-pane.block');
            const nextPane = document.getElementById(targetId);
            if (!nextPane || currentPane === nextPane) return;

            // Ocultar el panel actual con transición
            if (currentPane) {
                currentPane.classList.remove('block', 'opacity-100', 'scale-100');
                currentPane.classList.add('opacity-0', 'scale-95'); // Asegura que la transición de salida se aplica
            }

            // Preparar el siguiente panel para la transición de entrada
            nextPane.classList.remove('block', 'opacity-100', 'scale-100');
            nextPane.classList.add('hidden', 'opacity-0', 'scale-95'); // Asegura estado inicial de oculto

            // Esperar a que termine la transición de salida del panel actual (si hay)
            // Esto es crucial para que la animación se vea suave
            setTimeout(function() {
                if (currentPane) {
                    currentPane.classList.remove('block', 'opacity-100', 'scale-100'); // Quitar las clases de visible
                    currentPane.classList.add('hidden', 'opacity-0', 'scale-95'); // Asegurar que está oculto y en estado inicial
                }

                // Mostrar el nuevo panel y animar su entrada
                nextPane.classList.remove('hidden', 'opacity-0', 'scale-95');
                nextPane.classList.add('block'); // Activar la visibilidad
                // Forzar el reflow para asegurar que las propiedades de transición se apliquen desde el estado 'oculto'
                void nextPane.offsetWidth;
                nextPane.classList.add('opacity-100', 'scale-100'); // Aplicar las clases de visible para animar

            }, currentPane ? 200 : 0); // Espera 200ms si hay un panel actual, sino 0ms
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

        // Mini-carrito del mockup de catálogo en gallery
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

    // --- COMENTARIO: Modal QR ---
    const modalQr = document.getElementById('modal-qr');
    if (modalQr) modalQr.style.display = 'none';
    const btnQrCatalog = document.getElementById('btn-qr-catalog');
    const closeQrBtn = document.getElementById('close-modal-qr');
    const closeQrXBtn = document.getElementById('close-modal-qr-x');

    function openModalQr() {
        if (modalQr) {
            modalQr.classList.remove('hidden');
            modalQr.style.display = 'flex'; // Asegura que se muestre como flex
        }
    }
    function closeModalQr() {
        if (modalQr) {
            modalQr.classList.add('hidden');
            modalQr.style.display = 'none'; // Asegura que se oculte
        }
    }

    if (btnQrCatalog) btnQrCatalog.addEventListener('click', openModalQr);
    if (closeQrBtn) closeQrBtn.addEventListener('click', closeModalQr);
    if (closeQrXBtn) closeQrXBtn.addEventListener('click', closeModalQr);
    if (modalQr) modalQr.addEventListener('click', function(e) { if (e.target === modalQr) closeModalQr(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModalQr(); });

    // --- COMENTARIO: Descarga QR ---
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

    // --- COMENTARIO: Compartir Catálogo ---
    const btnShareCatalog = document.getElementById('btn-share-catalog');
    if (btnShareCatalog) {
        btnShareCatalog.addEventListener('click', function() {
            const shareData = { title: document.title, url: location.href };
            if (navigator.share) {
                navigator.share(shareData).catch(function() {});
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(location.href).then(function() {
                    const tip = btnShareCatalog.querySelector('.share-tooltip');
                    if (!tip) return;
                    const original = tip.textContent;
                    tip.textContent = '¡Enlace copiado!';
                    tip.classList.remove('opacity-0');
                    tip.classList.add('opacity-100');
                    setTimeout(function() {
                        tip.textContent = original;
                        tip.classList.add('opacity-0');
                        tip.classList.remove('opacity-100');
                    }, 1800);
                });
            }
        });
    }

}); // Cierre seguro del DOMContentLoaded global