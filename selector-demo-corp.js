// ─────────────────────────────────────────────────────────────────────
    // 4) DEMO — Selector de Sector (#demo-interactiva)
    //    Raíz: #industry-selector (tabs) + #demo-content-wrapper (paneles)
    //    Esta sección no tenía NINGÚN JS enganchado — por eso los tabs no
    //    reaccionaban. Usa data-target (no data-demo-target) y su propia
    //    clase .demo-panel, pero como todo se busca dentro de estas raíces
    //    y no de `document`, no choca con las otras 2 demos aunque una de
    //    ellas también use ".demo-panel".
    // ─────────────────────────────────────────────────────────────────────
    (function initIndustrySelectorDemo() {
        const tabsRoot = document.getElementById('industry-selector');
        const panelsRoot = document.getElementById('demo-content-wrapper');
        if (!tabsRoot || !panelsRoot) return; // esta página no tiene esta sección

        const tabButtons = tabsRoot.querySelectorAll('button[data-target]');
        const panels = panelsRoot.querySelectorAll('.demo-panel');

        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;

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

                panels.forEach((panel) => {
                    const show = panel.id === targetId;
                    panel.classList.toggle('hidden', !show);
                    panel.classList.toggle('block', show);
                });
            });
        });
    })();