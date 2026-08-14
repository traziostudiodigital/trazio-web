(function () {
  var carousel = document.getElementById('pricing-carousel');
  var dotsContainer = document.getElementById('pricing-dots');
  if (!carousel) return;

  var cards = carousel.querySelectorAll('.pricing-card-mobile');
  var dots = dotsContainer ? dotsContainer.querySelectorAll('.pricing-dot') : [];
  if (!cards.length || !('IntersectionObserver' in window)) return;

  var mq = window.matchMedia('(max-width: 767px)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observer = null;

  function updateDots(activeIndex) {
    if (!dots.length) return;
    dots.forEach(function (dot, idx) {
      if (idx === activeIndex) {
        dot.className = 'pricing-dot w-6 h-2 rounded-full bg-custom-accent transition-all duration-300 shadow-[0_0_8px_rgba(201,169,110,0.6)]';
      } else {
        dot.className = 'pricing-dot w-2 h-2 rounded-full bg-custom-accent/30 transition-all duration-300';
      }
    });
  }

  function onIntersect(entries) {
    entries.forEach(function (entry) {
      var isVisible = entry.intersectionRatio > 0.5;
      entry.target.classList.toggle('is-active', isVisible);

      if (isVisible) {
        var cardIndex = Array.prototype.indexOf.call(cards, entry.target);
        if (cardIndex !== -1) updateDots(cardIndex);
      }
    });
  }

  function enable() {
    if (observer || reducedMotion) return;
    observer = new IntersectionObserver(onIntersect, {
      root: carousel,
      threshold: [0.5, 0.8]
    });
    cards.forEach(function (card) { observer.observe(card); });
  }

  function disable() {
    if (!observer) return;
    observer.disconnect();
    observer = null;
    cards.forEach(function (card) { card.classList.remove('is-active'); });
  }

  function sync() {
    if (mq.matches) enable(); else disable();
  }

  sync();
  mq.addEventListener('change', sync);
})();