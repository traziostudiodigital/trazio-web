// Archivo: assets/tech-contact-form.js (Lógica de la Demo Corporativa)
document.addEventListener('DOMContentLoaded', function() {
    const tabsRoot = document.getElementById('industry-selector');
    const panelsRoot = document.getElementById('demo-content-wrapper');
    
    if (!tabsRoot || !panelsRoot) return; // Si no estamos en la página corporativa, se detiene silenciosamente

    const tabButtons = tabsRoot.querySelectorAll('button[data-target]');
    const panels = panelsRoot.querySelectorAll('.demo-panel');

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;

            // 1. Cambiar estilos de los botones
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

            // 2. Mostrar/Ocultar paneles
            panels.forEach((panel) => {
                const show = panel.id === targetId;
                panel.classList.toggle('hidden', !show);
                panel.classList.toggle('block', show);
                
                // Reiniciar animación CSS
                if (show) {
                    panel.classList.remove('animate-fade-in-up');
                    void panel.offsetWidth; // Hack para reiniciar animación
                    panel.classList.add('animate-fade-in-up');
                }
            });
        });
    });
});