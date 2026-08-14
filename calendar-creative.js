(function () {
  var months = [
    {
      label: 'Noviembre 2026',
      leadingBlank: 4, 
      totalDays: 15,   
      unavailable: [1, 2, 3, 13, 14],
      defaultActive: 8
    },
    {
      label: 'Diciembre 2026',
      leadingBlank: 1, 
      totalDays: 15,
      unavailable: [5, 6, 12, 13],
      defaultActive: 3
    }
  ];
  var timeSlotsData = ['10:00 AM', '2:00 PM', '4:30 PM'];

  var monthIndex = 0;
  var selectedDay = months[0].defaultActive;
  var selectedTime = timeSlotsData[0];

  var grid = document.getElementById('cal-days-grid');
  var label = document.getElementById('cal-month-label');
  var slotsWrap = document.getElementById('cal-time-slots');
  var confirmBtn = document.getElementById('cal-confirm-btn');

  var dayBtnBase = 'py-2 rounded-md text-sm transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-accent';
  var dayBtnAvailable = dayBtnBase + ' text-custom-main hover:bg-custom-card cursor-pointer';
  var dayBtnActive = dayBtnBase + ' bg-custom-accent text-black font-bold shadow-md shadow-custom-accent/20 cursor-pointer';
  var dayBtnDisabled = dayBtnBase + ' text-custom-muted opacity-40 cursor-not-allowed';

  function renderMonth() {
    var m = months[monthIndex];
    label.textContent = m.label;
    grid.innerHTML = '';

    for (var i = 0; i < m.leadingBlank; i++) {
      var blank = document.createElement('div');
      grid.appendChild(blank);
    }

    for (var d = 1; d <= m.totalDays; d++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = d;
      var isUnavailable = m.unavailable.indexOf(d) !== -1;
      var isActive = d === selectedDay;

      if (isUnavailable) {
        btn.className = dayBtnDisabled;
        btn.disabled = true;
        btn.setAttribute('aria-label', 'Día ' + d + ', no disponible');
      } else {
        btn.className = isActive ? dayBtnActive : dayBtnAvailable;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        btn.setAttribute('aria-label', 'Día ' + d + ', disponible');
        btn.addEventListener('click', function () {
          selectedDay = parseInt(this.textContent, 10);
          renderMonth();
          updateConfirmLink();
        });
      }
      grid.appendChild(btn);
    }
  }

  function renderTimeSlots() {
    slotsWrap.innerHTML = '';
    timeSlotsData.forEach(function (time) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = time;
      var isActive = time === selectedTime;
      btn.className = 'py-2 px-1 rounded-md text-[11px] font-semibold border transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-accent ' +
        (isActive
          ? 'bg-custom-accent text-black border-custom-accent'
          : 'bg-custom-card text-custom-muted border-custom hover:border-custom-accent/40 hover:text-custom-accent');
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.addEventListener('click', function () {
        selectedTime = this.textContent;
        renderTimeSlots();
        updateConfirmLink();
      });
      slotsWrap.appendChild(btn);
    });
  }

  function updateConfirmLink() {
    var m = months[monthIndex];
    var msg = 'Hola, quiero confirmar mi reserva para el ' + selectedDay + ' de ' + m.label + ' a las ' + selectedTime;
    confirmBtn.href = 'https://wa.me/5353200426?text=' + encodeURIComponent(msg);
  }

  document.getElementById('cal-prev').addEventListener('click', function () {
    monthIndex = (monthIndex - 1 + months.length) % months.length;
    selectedDay = months[monthIndex].defaultActive;
    renderMonth();
    updateConfirmLink();
  });
  document.getElementById('cal-next').addEventListener('click', function () {
    monthIndex = (monthIndex + 1) % months.length;
    selectedDay = months[monthIndex].defaultActive;
    renderMonth();
    updateConfirmLink();
  });

  renderMonth();
  renderTimeSlots();
  updateConfirmLink();
})();