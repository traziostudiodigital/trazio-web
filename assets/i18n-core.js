/* assets/i18n-core.js — Motor Lógico de Traducción */
(function () {
    if (window.__trazioI18nInit) return;
    window.__trazioI18nInit = true;

    function applyLanguage(lang) {
        // Lee el diccionario global definido en i18n-data.js
        const dict = window.TRAZIO_I18N[lang] || window.TRAZIO_I18N['es']; 
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // Usamos innerHTML para soportar etiquetas <span> dentro de las traducciones
                el.innerHTML = dict[key];
            }
        });
        
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('trazio-lang', lang);
        
        const display = document.getElementById('current-lang-display');
        if (display) display.textContent = lang.toUpperCase();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('trazio-lang') || 'es';
        applyLanguage(saved);

        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const current = localStorage.getItem('trazio-lang') || 'es';
                applyLanguage(current === 'es' ? 'en' : 'es');
            });
        }
    });
})();