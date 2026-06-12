/**
 * Trazio Studio - Catálogo Demo Multisección
 * Lógica de la Aplicación (catalog-app.js)
 * 
 * Gestiona los estados de los nichos (Comida, Ropa, Servicios), renderizado dinámico,
 * carrito de compras con soporte para tallas, alertas personalizadas, traducción bilingüe,
 * cambio de tema sincronizado y envío automático a WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO GLOBAL ---
    let activeNiche = 'comida';
    let cart = {}; // key: 'productId' para comida, 'productId_size' para ropa
    let currentLang = localStorage.getItem('language') || 'es';
    let currentTheme = localStorage.getItem('theme') || 'dark'; // 'dark' o 'light'
    let selectedService = null;

    // --- DICCIONARIO DE TRADUCCIONES DE LA INTERFAZ ---
    const UI_TRANSLATIONS = {
        es: {
            "cat-hero-title": "Automatiza tus Ventas en Cuba con un <span class=\"text-custom-accent\">Catálogo que Carga al Instante</span>",
            "cat-hero-subtitle": "Olvídate de los pesados archivos PDF que consumen los megas de tus clientes. Ofrece una experiencia de compra rápida, interactiva y con pedidos que llegan directo a tu WhatsApp.",
            "cat-hero-cta-primary": "Ver Demos Interactivas",
            "cat-hero-cta-secondary": "Quiero mi Catálogo",
            
            "cat-bento-title-1": "Cero Costo Mensual",
            "cat-bento-desc-1": "Sin suscripciones recurrentes. Un único pago inicial de desarrollo.",
            "cat-bento-title-2": "Velocidad Extrema",
            "cat-bento-desc-2": "Carga en milisegundos incluso con datos móviles limitados.",
            "cat-bento-title-3": "Ventas en Google",
            "cat-bento-desc-3": "Indexación optimizada para aparecer en las búsquedas de tus clientes.",
            "cat-bento-title-4": "Autogestionable",
            "cat-bento-desc-4": "Actualiza precios y stock instantáneamente de forma sencilla.",
            
            "demo-title": "Demos Interactivas",
            "demo-subtitle": "Prueba los nichos disponibles.",
            
            "modal-title": "Activar mi Catálogo",
            "modal-placeholder-name": "Tu nombre",
            "modal-submit-btn": "Enviar",
            
            "checkout-total-label": "Total seleccionado",
            "whatsapp-btn-text": "Pedir por WhatsApp",
            "loading-text": "Cargando menú...",
            "add-btn": "Añadir",
            "request-btn": "Solicitar",
            
            "size-label": "Talla:",
            "base-price": "Precio Base:",
            
            "pas-title": "¿Cuánto te cuesta seguir vendiendo a la antigua?",
            "pas-desc": "Mientras dedicas 15 minutos de chat para cerrar una venta básica enviando PDFs pesados de 20MB, tus competidores reciben pedidos listos y organizados en su WhatsApp en solo 3 clics. No pierdas más clientes por demoras en tus respuestas.",
            
            "turnkey-title": "Proceso Blindado ante la realidad cubana",
            "turnkey-subtitle": "Soluciones diseñadas para funcionar incluso con conexiones inestables o cortes eléctricos, garantizando que tu negocio nunca se detenga.",
            "turnkey-s1-title": "Diseño Ultra-Ligero",
            "turnkey-s1-desc": "Arquitectura optimizada para cargar al instante incluso bajo redes 3G o inestables.",
            "turnkey-s2-title": "Resiliencia ante Apagones",
            "turnkey-s2-desc": "Tus pedidos quedan en cola y se sincronizan apenas recuperas conexión, evitando pérdidas de clientes.",
            "turnkey-s3-title": "Entrega sin fricción",
            "turnkey-s3-desc": "Pedidos organizados que llegan directo a tu WhatsApp, sin depender de paneles complejos que requieren internet constante.",
            "footer-aida-text": "¿Listo para hacer crecer tu negocio?",
            "footer-aida-desc": "Escríbenos y mándanos tu catálogo, lista de precios o idea por WhatsApp. Te preparamos una demostración interactiva totalmente gratis y adaptada a tu sector en menos de 24 horas.",
            "footer-aida-cta": "SOLICITAR DEMOSTRACIÓN GRATIS",
            "footer-microcopy": "<span class='text-custom-accent'>✔</span> Sin costo técnico, compromisos ni contratos de mantenimiento.",
            "hero-microcopy": "<span class='text-custom-accent mr-1.5'>•</span>Deja de ser un esclavo de tu WhatsApp. Automatiza tus pedidos y recupera hasta 3 horas al día.",
            "hero-microcopy-text": "Deja de ser un esclavo de tu WhatsApp. Automatiza tus pedidos y recupera hasta 3 horas al día.",
            "support-badge": "CONFIANZA Y GARANTÍA",
            "support-title": "Soporte 100% Local",
            "support-desc": "No somos una plataforma externa. Somos un estudio creativo basado en Cuba. Si tienes cualquier duda o problema técnico, estamos disponibles para ayudarte por WhatsApp al instante. Garantizamos que tu negocio nunca se detenga.",
            "demo-faq-badge": "DUDAS COMERCIALES",
            "demo-faq-title": "Preguntas de negocios como el tuyo",
            "demo-faq-q1": "¿Tengo que pagar comisiones por las ventas que realice?",
            "demo-faq-a1": "No. El catálogo es 100% de tu propiedad. No cobramos comisiones por pedido, no hay intermediarios y el flujo de caja va directo a tus manos.",
            "demo-faq-q2": "¿Cómo actualizo mis productos o precios si el mercado cambia?",
            "demo-faq-a2": "Te entregamos un panel de administración ultra-lígero que puedes abrir desde tu teléfono móvil. Cambias un precio, editas un producto o desactivas el stock en 30 segundos sin depender de un programador.",
            "demo-faq-q3": "¿Qué pasa si mi teléfono está apagado o no tengo datos en el momento de un pedido?",
            "demo-faq-a3": "Tus clientes pueden seguir navegando y armando sus pedidos las 24 horas del día. Los pedidos quedan listos en espera y te llegarán organizados a tu WhatsApp en cuanto tu teléfono recupere la conexión.",
            
            "cbox-title": "Una sola inversión, cero mensualidades.",
            "cbox-desc": "El costo de implementar tu catálogo equivale a lo que pierde tu negocio en una sola semana por clientes que se van con la competencia debido a la demora en WhatsApp. Automatiza tu operación hoy y recupera tu inversión en menos de 30 días.",
            "cbox-btn": "PROBAR MI MENÚ GRATIS",
            "cbox-microcopy": "✓ Diseñamos una maqueta de prueba interactiva con tus propios productos sin que pagues nada."
        },
        en: {
            "cat-hero-title": "Automate your Sales in Cuba with a <span class=\"text-custom-accent\">Catalog that Loads Instantly</span>",
            "cat-hero-subtitle": "Forget heavy PDF files that consume your clients' data. Offer a fast, interactive shopping experience with orders arriving directly to your WhatsApp.",
            "cat-hero-cta-primary": "View Interactive Demos",
            "cat-hero-cta-secondary": "I Want my Catalog",
            
            "cat-bento-title-1": "Zero Monthly Cost",
            "cat-bento-desc-1": "No recurring subscriptions. A single upfront development payment.",
            "cat-bento-title-2": "Extreme Speed",
            "cat-bento-desc-2": "Loads in milliseconds even with limited mobile data.",
            "cat-bento-title-3": "Google Sales",
            "cat-bento-desc-3": "Optimized indexing to appear directly in your customers' searches.",
            "cat-bento-title-4": "Self-Manageable",
            "cat-bento-desc-4": "Easily update prices and inventory instantly.",
            
            "demo-title": "Interactive Demos",
            "demo-subtitle": "Try out the available niches.",
            
            "modal-title": "Activate my Catalog",
            "modal-placeholder-name": "Your name",
            "modal-submit-btn": "Send",
            
            "checkout-total-label": "Selected Total",
            "whatsapp-btn-text": "Order via WhatsApp",
            "loading-text": "Loading menu...",
            "add-btn": "Add",
            "request-btn": "Request",
            
            "size-label": "Size:",
            "base-price": "Base Price:",
            
            "turnkey-title": "Process Shielded from the Cuban Reality",
            "turnkey-subtitle": "Solutions designed to function even with unstable connections or power outages, ensuring your business never stops.",
            "turnkey-s1-title": "Ultra-Lightweight Design",
            "turnkey-s1-desc": "Architecture optimized to load instantly even under 3G or unstable networks.",
            "turnkey-s2-title": "Resilience against Outages",
            "turnkey-s2-desc": "Your orders stay queued and sync as soon as you regain connection, preventing lost sales.",
            "turnkey-s3-title": "Frictionless Delivery",
            "turnkey-s3-desc": "Organized orders sent directly to your WhatsApp, without relying on complex panels requiring constant internet.",
            "footer-aida-text": "Ready to grow your business?",
            "footer-aida-desc": "Write to us and send your catalog, price list, or idea via WhatsApp. We will prepare an interactive demo completely free and tailored to your sector in less than 24 hours.",
            "footer-aida-cta": "REQUEST FREE DEMONSTRATION",
            "footer-microcopy": "<span class='text-custom-accent'>✔</span> No technical cost, commitments, or maintenance contracts.",
            "hero-microcopy": "<span class='text-custom-accent mr-1.5'>•</span>Stop being a slave to your WhatsApp. Automate your orders and win back up to 3 hours a day.",
            "hero-microcopy-text": "Stop being a slave to your WhatsApp. Automate your orders and win back up to 3 hours a day.",
            "support-badge": "TRUST AND GUARANTEE",
            "support-title": "100% Local Support",
            "support-desc": "We are not an external platform. We are a creative studio based in Cuba. If you have any technical questions or issues, we are available to help you via WhatsApp instantly. We guarantee that your business never stops.",
            "demo-faq-badge": "BUSINESS QUESTIONS",
            "demo-faq-title": "Questions from businesses like yours",
            "demo-faq-q1": "Do I have to pay commissions on sales I make?",
            "demo-faq-a1": "No. The catalog is 100% owned by you. We do not charge commissions per order, there are no intermediaries, and cash flow goes directly to your hands.",
            "demo-faq-q2": "How do I update my products or prices if the market changes?",
            "demo-faq-a2": "We provide you with an ultra-lightweight administration panel that you can open from your mobile phone. You change a price, edit a product, or disable stock in 30 seconds without relying on a programmer.",
            "demo-faq-q3": "What happens if my phone is off or I don't have data at the time of an order?",
            "demo-faq-a3": "Your customers can continue browsing and building their orders 24 hours a day. Orders will be queued and arrive organized to your WhatsApp as soon as your phone recovers connection.",

            "cbox-title": "A single investment, zero monthly fees.",
            "cbox-desc": "The cost of implementing your catalog is equivalent to what your business loses in a single week due to customers leaving for the competition because of WhatsApp delays. Automate your operation today and recover your investment in less than 30 days.",
            "cbox-btn": "TRY MY MENU FOR FREE",
            "cbox-microcopy": "✓ We design an interactive test mockup with your own products at no cost."
        }
    };

    // --- INYECCIÓN DINÁMICA DE LA BARRA DE CHECKOUT (STICKY FOOTER) ---
    function injectCheckoutBar() {
        let bar = document.getElementById('checkout-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'checkout-bar';
            bar.className = 'fixed bottom-0 left-0 right-0 z-50 bg-custom-card border-t border-custom/10 p-4 shadow-lg transform translate-y-full transition-transform duration-300 hidden';
            bar.innerHTML = `
                <div class="max-w-4xl mx-auto flex items-center justify-between">
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase font-bold text-custom-muted" id="checkout-total-label" data-i18n="checkout-total-label">Total seleccionado</span>
                        <span id="cart-total-price" class="text-base font-extrabold text-custom-accent">$0.00</span>
                    </div>
                    <button id="whatsapp-order-btn" class="px-6 py-3 bg-custom-accent hover:bg-custom-accent-hover text-black font-bold uppercase text-xs tracking-wider flex items-center space-x-2 rounded-none transition-all duration-300">
                        <span id="whatsapp-btn-text" data-i18n="whatsapp-btn-text">Pedir por WhatsApp</span>
                        <span id="cart-counter" class="bg-black text-custom-accent text-[10px] font-extrabold px-2 py-0.5 rounded-none">0</span>
                    </button>
                </div>
            `;
            document.body.appendChild(bar);
        }
    }

    // --- ALERTA / TOAST PERSONALIZADA PREMIUM ---
    function showAlert(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-5 left-1/2 transform -translate-x-1/2 z-50 space-y-2 pointer-events-none w-11/12 max-w-sm';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = `p-4 text-xs font-bold uppercase tracking-wider text-black text-center shadow-lg transform translate-y-[-20px] opacity-0 transition-all duration-300 pointer-events-auto rounded-none ${
            type === 'warning' ? 'bg-amber-500' : 'bg-custom-accent'
        }`;
        toast.textContent = message;
        container.appendChild(toast);
        
        toast.offsetHeight; // Forzar reflow
        
        toast.classList.remove('translate-y-[-20px]', 'opacity-0');
        
        setTimeout(() => {
            toast.classList.add('translate-y-[-20px]', 'opacity-0');
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, 3000);
    }

    // --- MANEJO DE NICHOS ---
    function selectNiche(niche) {
        activeNiche = niche;
        cart = {}; // Limpia el carrito al cambiar de nicho
        
        // Actualizar estados visuales de las pestañas de nicho
        const buttons = {
            comida: document.getElementById('btn-niche-comida'),
            ropa: document.getElementById('btn-niche-ropa'),
            servicios: document.getElementById('btn-niche-servicios')
        };
        
        Object.keys(buttons).forEach(key => {
            const btn = buttons[key];
            if (btn) {
                if (key === niche) {
                    btn.className = "px-6 py-3 text-xs font-bold uppercase bg-custom-accent text-black rounded-none transition-all duration-300 shadow-md";
                } else {
                    btn.className = "px-6 py-3 text-xs font-bold uppercase text-custom-main hover:text-custom-accent border border-transparent rounded-none transition-all duration-300";
                }
            }
        });
        
        updateCheckoutBar();
        renderCatalog();
    }

    // --- BUSCAR PRODUCTO POR ID ---
    function findProductById(productId) {
        const data = window.multiNicheData || {};
        for (const niche of Object.keys(data)) {
            const product = data[niche].find(p => p.id === productId);
            if (product) return product;
        }
        return null;
    }

    // --- RENDERIZADO DINÁMICO DEL MENÚ (CATALOGO) ---
    function renderCatalog() {
        const catalogGrid = document.getElementById('catalog-items-grid');
        if (!catalogGrid) return;
        
        catalogGrid.innerHTML = '';
        const items = window.multiNicheData[activeNiche] || [];
        
        items.forEach(item => {
            let cardHtml = '';
            
            if (activeNiche === 'comida') {
                const qtyInCart = cart[item.id] ? cart[item.id].qty : 0;
                cardHtml = `
                    <div class="bg-custom-card border border-custom/10 p-5 rounded-none group hover:border-custom-accent/30 transition-all flex flex-col justify-between h-full radial-glow w-full max-w-[280px]">
                        <div>
                            <div class="w-full h-48 overflow-hidden relative bg-custom-main border border-custom/5">
                                <img src="${item.image}" alt="${item.name[currentLang]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                                ${qtyInCart > 0 ? `
                                <div class="absolute top-2 right-2 bg-custom-accent text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-none shadow-md">
                                    ${qtyInCart}
                                </div>` : ''}
                            </div>
                            <h3 class="text-lg font-bold uppercase mt-4 mb-1.5 text-custom-main break-words text-[clamp(1rem,4vw,1.125rem)] leading-tight tracking-tight">${item.name[currentLang]}</h3>
                            <p class="text-xs text-custom-muted mb-4 font-body leading-relaxed flex-grow min-h-[3rem] whitespace-normal">${item.desc[currentLang]}</p>
                        </div>
                        <div class="flex items-center justify-between mt-auto pt-3 border-t border-custom/5">
                            <span class="text-base font-bold text-custom-accent">$${item.price.toFixed(2)}</span>
                            <div class="flex items-center space-x-1.5">
                                ${qtyInCart > 0 ? `
                                <button onclick="changeQty('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-xs font-extrabold text-custom-main bg-custom-main border border-custom/10 hover:border-custom-accent transition-all rounded-none">−</button>
                                <span class="text-xs font-bold w-5 text-center text-custom-main">${qtyInCart}</span>
                                ` : ''}
                                <button onclick="addComidaToCart('${item.id}')" class="px-3.5 py-2 bg-custom-accent hover:bg-custom-accent-hover text-black font-bold uppercase text-[10px] tracking-wider rounded-none transition-all">+ ${UI_TRANSLATIONS[currentLang]["add-btn"]}</button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (activeNiche === 'ropa') {
                const addedItemsHtml = Object.keys(cart)
                    .filter(key => cart[key].id === item.id)
                    .map(key => `
                        <div class="text-[10px] bg-custom-accent/10 text-custom-accent border border-custom-accent/20 px-2 py-1 font-bold uppercase rounded-none flex justify-between items-center w-full mt-1.5">
                            <span>Talla ${cart[key].size}: ${cart[key].qty}x</span>
                            <div class="flex items-center space-x-2">
                                <button onclick="changeRopaQty('${key}', -1)" class="hover:text-custom-main font-extrabold px-1 text-xs">−</button>
                                <button onclick="changeRopaQty('${key}', 1)" class="hover:text-custom-main font-extrabold px-1 text-xs">+</button>
                            </div>
                        </div>
                    `).join('');

                cardHtml = `
                    <div class="bg-custom-card border border-custom/10 p-5 rounded-none group hover:border-custom-accent/30 transition-all flex flex-col justify-between h-full radial-glow w-full max-w-[280px]">
                        <div>
                            <div class="w-full h-48 overflow-hidden relative bg-custom-main border border-custom/5">
                                <img src="${item.image}" alt="${item.name[currentLang]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                            </div>
                            <h3 class="text-lg font-bold uppercase mt-4 mb-1.5 text-custom-main break-words text-[clamp(1rem,4vw,1.125rem)] leading-tight tracking-tight">${item.name[currentLang]}</h3>
                            <p class="text-xs text-custom-muted mb-4 font-body leading-relaxed flex-grow min-h-[3rem] whitespace-normal">${item.desc[currentLang]}</p>
                            
                            <!-- Selector de Tallas -->
                            <div class="flex items-center space-x-2 mt-2 mb-4">
                                <span class="text-[10px] uppercase font-bold text-custom-muted mr-1">${UI_TRANSLATIONS[currentLang]["size-label"]}</span>
                                ${item.sizes.map(size => `
                                    <label class="cursor-pointer">
                                        <input type="radio" name="size-${item.id}" value="${size}" class="hidden peer">
                                        <span class="w-7 h-7 flex items-center justify-center text-[11px] font-bold border border-custom/20 text-custom-main peer-checked:bg-custom-accent peer-checked:text-black peer-checked:border-custom-accent transition-all duration-200">${size}</span>
                                    </label>
                                `).join('')}
                            </div>
                            
                            <!-- Resumen en carrito para este producto -->
                            ${addedItemsHtml ? `
                            <div class="mb-4">
                                <span class="text-[9px] uppercase font-bold text-custom-muted">En el carrito:</span>
                                <div class="space-y-1 mt-1">${addedItemsHtml}</div>
                            </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex items-center justify-between mt-auto pt-3 border-t border-custom/5">
                            <span class="text-base font-bold text-custom-accent">$${item.price.toFixed(2)}</span>
                            <button onclick="addRopaToCart('${item.id}')" class="px-3.5 py-2 bg-custom-accent hover:bg-custom-accent-hover text-black font-bold uppercase text-[10px] tracking-wider rounded-none transition-all">+ ${UI_TRANSLATIONS[currentLang]["add-btn"]}</button>
                        </div>
                    </div>
                `;
            } else if (activeNiche === 'servicios') {
                cardHtml = `
                    <div class="bg-custom-card border border-custom/10 p-5 rounded-none group hover:border-custom-accent/30 transition-all flex flex-col justify-between h-full radial-glow w-full max-w-[280px]">
                        <div>
                            <div class="w-full h-48 overflow-hidden relative bg-custom-main border border-custom/5">
                                <img src="${item.image}" alt="${item.name[currentLang]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                            </div>
                            <h3 class="text-lg font-bold uppercase mt-4 mb-1.5 text-custom-main break-words text-[clamp(1rem,4vw,1.125rem)] leading-tight tracking-tight">${item.name[currentLang]}</h3>
                            <p class="text-xs text-custom-muted mb-4 font-body leading-relaxed flex-grow min-h-[3rem] whitespace-normal">${item.desc[currentLang]}</p>
                        </div>
                        
                        <div class="flex flex-col space-y-3 mt-auto pt-3 border-t border-custom/5">
                            <div class="flex justify-between items-center">
                                <span class="text-[10px] uppercase font-bold text-custom-muted">${UI_TRANSLATIONS[currentLang]["base-price"]}</span>
                                <span class="text-base font-bold text-custom-accent">$${item.price.toFixed(2)} USD</span>
                            </div>
                            <button onclick="openServiceModal('${item.id}')" class="w-full py-2.5 bg-custom-accent hover:bg-custom-accent-hover text-black font-bold uppercase text-[11px] tracking-wider rounded-none transition-all text-center">Solicitar Cotización</button>
                        </div>
                    </div>
                `;
            }
            
            catalogGrid.innerHTML += cardHtml;
        });
    }

    // --- OPERACIONES DE CARRITO EXPUESTAS GLOBALMENTE ---
    window.addComidaToCart = function(productId) {
        if (!cart[productId]) {
            cart[productId] = { id: productId, size: '', qty: 1 };
        } else {
            cart[productId].qty += 1;
        }
        updateCheckoutBar();
        renderCatalog();
    };

    window.changeQty = function(productId, delta) {
        if (cart[productId]) {
            cart[productId].qty += delta;
            if (cart[productId].qty <= 0) {
                delete cart[productId];
            }
            updateCheckoutBar();
            renderCatalog();
        }
    };

    window.addRopaToCart = function(productId) {
        const radioSelected = document.querySelector(`input[name="size-${productId}"]:checked`);
        if (!radioSelected) {
            showAlert(
                currentLang === 'es' 
                    ? 'Por favor, selecciona una talla antes de añadir.' 
                    : 'Please select a size before adding.',
                'warning'
            );
            return;
        }
        const size = radioSelected.value;
        const cartKey = `${productId}_${size}`;
        
        if (!cart[cartKey]) {
            cart[cartKey] = { id: productId, size: size, qty: 1 };
        } else {
            cart[cartKey].qty += 1;
        }
        
        updateCheckoutBar();
        renderCatalog();
    };

    window.changeRopaQty = function(cartKey, delta) {
        if (cart[cartKey]) {
            cart[cartKey].qty += delta;
            if (cart[cartKey].qty <= 0) {
                delete cart[cartKey];
            }
            updateCheckoutBar();
            renderCatalog();
        }
    };

    window.openServiceModal = function(productId) {
        const services = window.multiNicheData['servicios'] || [];
        selectedService = services.find(s => s.id === productId);
        
        const modal = document.getElementById('service-modal');
        if (modal) {
            modal.classList.remove('hidden');
            const modalTitle = modal.querySelector('h3');
            if (modalTitle && selectedService) {
                modalTitle.textContent = currentLang === 'es' 
                    ? `Cotizar: ${selectedService.name.es}` 
                    : `Quote: ${selectedService.name.en}`;
            }
        }
    };

    // --- ACTUALIZAR LA BARRA DE CHECKOUT DYNAMICAMENTE ---
    function updateCheckoutBar() {
        injectCheckoutBar();
        
        const bar = document.getElementById('checkout-bar');
        const priceEl = document.getElementById('cart-total-price');
        const counterEl = document.getElementById('cart-counter');
        
        if (!bar || !priceEl || !counterEl) return;
        
        let total = 0;
        let totalItems = 0;
        
        Object.keys(cart).forEach(key => {
            const item = cart[key];
            const product = findProductById(item.id);
            if (product) {
                total += product.price * item.qty;
                totalItems += item.qty;
            }
        });
        
        priceEl.textContent = `$${total.toFixed(2)}`;
        counterEl.textContent = totalItems;
        
        if (totalItems > 0 && activeNiche !== 'servicios') {
            bar.classList.remove('hidden');
            setTimeout(() => {
                bar.classList.remove('translate-y-full');
            }, 10);
        } else {
            bar.classList.add('translate-y-full');
            setTimeout(() => {
                if (bar.classList.contains('translate-y-full')) {
                    bar.classList.add('hidden');
                }
            }, 300);
        }
    }

    // --- DISPACHO DE PEDIDOS A WHATSAPP (COMIDA / ROPA) ---
    function sendOrderToWhatsApp() {
        let text = '';
        const borderLine = '━━━━━━━━━━━━━━━━━━━━';

        // 1. Título Header según Nicho
        if (activeNiche === 'comida') {
            text += `*🍔 NUEVO PEDIDO - RESTAURANTE / CAFÉ 🍔*\n`;
        } else if (activeNiche === 'ropa') {
            text += `*�️ NUEVA COMPRA - TIENDA / COMBOS 🛍️*\n`;
        } else if (activeNiche === 'servicios') {
            text += `*⚡ SOLICITUD DE COTIZACIÓN - SERVICIOS PROFESIONALES ⚡*\n`;
        }
        text += `${borderLine}\n\n`;

        // 2. Cuerpo del pedido (Listar productos comprados)
        let total = 0;
        
        Object.keys(cart).forEach(key => {
            const item = cart[key];
            const product = findProductById(item.id);
            if (product) {
                const subtotal = product.price * item.qty;
                total += subtotal;
                
                const sizeStr = item.size ? ` (Talla ${item.size})` : '';
                text += `• *${item.qty}x* ${product.name[currentLang]}${sizeStr} - _$${subtotal.toFixed(2)}_\n`;
            }
        });

        text += `\n${borderLine}\n`;

        // 3. Total a pagar
        if (currentLang === 'es') {
            text += `*Total a pagar: $${total.toFixed(2)} USD*\n\n`;
        } else {
            text += `*Total to pay: $${total.toFixed(2)} USD*\n\n`;
        }

        // 4. Footer comercial de Trazio Studio
        if (currentLang === 'es') {
            text += `_Pedido realizado desde la web demo de Trazio Studio._`;
        } else {
            text += `_Order placed from the Trazio Studio web demo._`;
        }

        // 5. URL encode y redirección (Usa número demo de Cuba +53 50000000)
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/5350000000?text=${encodedText}`;

        window.open(whatsappUrl, '_blank');
    }

    // Escuchar clic del botón de pedir en la barra de checkout
    document.addEventListener('click', (e) => {
        if (e.target.closest('#whatsapp-order-btn')) {
            sendOrderToWhatsApp();
        }
    });

    // --- TEMA (OSCURO / CLARO) ---
    function applyTheme(theme) {
        const themeMoonSvg = document.getElementById('theme-moon-svg');
        const themeSunSvg = document.getElementById('theme-sun-svg');
        
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            if (themeMoonSvg) themeMoonSvg.classList.add('hidden');
            if (themeSunSvg) themeSunSvg.classList.remove('hidden');
        } else {
            document.body.classList.remove('light-theme');
            if (themeMoonSvg) themeMoonSvg.classList.remove('hidden');
            if (themeSunSvg) themeSunSvg.classList.add('hidden');
        }
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }

    // --- IDIOMA (ESPAÑOL / INGLÉS) ---
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        const currentLangText = document.getElementById('current-lang-text');
        if (currentLangText) {
            currentLangText.textContent = lang.toUpperCase();
        }

        // Traducir todos los elementos estáticos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = UI_TRANSLATIONS[lang][key];
                } else {
                    el.innerHTML = UI_TRANSLATIONS[lang][key];
                }
            }
        });

        // Traducir dinámicamente elementos internos del formulario del modal de servicios
        const modalInput = document.querySelector('#modal-service-form input[type="text"]');
        if (modalInput && UI_TRANSLATIONS[lang]["modal-placeholder-name"]) {
            modalInput.placeholder = UI_TRANSLATIONS[lang]["modal-placeholder-name"];
        }
        const modalSubmit = document.querySelector('#modal-service-form button[type="submit"]');
        if (modalSubmit && UI_TRANSLATIONS[lang]["modal-submit-btn"]) {
            modalSubmit.textContent = UI_TRANSLATIONS[lang]["modal-submit-btn"];
        }

        renderCatalog();
        updateCheckoutBar();
    }

    // --- INICIALIZACIÓN DE LA APLICACIÓN ---
    function init() {
        injectCheckoutBar();
        applyTheme(currentTheme);
        applyLanguage(currentLang);
        
        const btnNicheComida = document.getElementById('btn-niche-comida');
        const btnNicheRopa = document.getElementById('btn-niche-ropa');
        const btnNicheServicios = document.getElementById('btn-niche-servicios');
        
        if (btnNicheComida) btnNicheComida.addEventListener('click', () => selectNiche('comida'));
        if (btnNicheRopa) btnNicheRopa.addEventListener('click', () => selectNiche('ropa'));
        if (btnNicheServicios) btnNicheServicios.addEventListener('click', () => selectNiche('servicios'));
        
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme);
            });
        }
        
        const langToggleBtn = document.getElementById('lang-toggle-btn');
        if (langToggleBtn) {
            langToggleBtn.addEventListener('click', () => {
                const nextLang = currentLang === 'es' ? 'en' : 'es';
                applyLanguage(nextLang);
            });
        }

        // Escuchar el envío del formulario de cotización (Servicios)
        const serviceForm = document.getElementById('modal-service-form');
        if (serviceForm) {
            serviceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = serviceForm.querySelector('input[type="text"]');
                const contactName = nameInput ? nameInput.value.trim() : '';
                
                if (!contactName) return;
                
                const serviceName = selectedService ? selectedService.name[currentLang] : '';
                
                const message = `*⚡ SOLICITUD DE COTIZACIÓN - NEXO SERVICIOS ⚡*\n\n` +
                                `Hola Nexo Servicios, me interesa el servicio de: *${serviceName}* para mi casa o negocio.\n\n` +
                                `• Nombre de contacto: ${contactName}\n\n` +
                                `_Solicitado desde el portal demo de Trazio Studio._`;
                                
                const encodedText = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/5350000000?text=${encodedText}`;
                
                window.open(whatsappUrl, '_blank');
                
                const modal = document.getElementById('service-modal');
                if (modal) modal.classList.add('hidden');
                serviceForm.reset();
            });
        }

        // Cerrar modal al hacer clic fuera del contenedor
        const modalElement = document.getElementById('service-modal');
        if (modalElement) {
            modalElement.addEventListener('click', (e) => {
                if (e.target === modalElement) {
                    modalElement.classList.add('hidden');
                }
            });
        }
        
        // FAQ Accordion logic
        const faqItems = document.querySelectorAll('.demo-faq-item');
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const content = item.querySelector('.demo-faq-content');
                const icon = item.querySelector('.demo-faq-icon');
                
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.demo-faq-content');
                        const otherIcon = otherItem.querySelector('.demo-faq-icon');
                        otherContent.style.maxHeight = null;
                        otherIcon.textContent = '+';
                    }
                });

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.textContent = '+';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '−';
                }
            });
        });

        // Carga inicial del nicho Comida
        selectNiche(activeNiche);
    }

    init();
});