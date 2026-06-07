// ===== Pilot — reservations flow (mock availability) =====

const $ = (id) => document.getElementById(id);

const stepSearch  = $('step-search');
const stepDetails = $('step-details');
const stepConfirm = $('step-confirmed');
const results     = $('results');
const slotsEl     = $('slots');
const noSlots     = $('noSlots');

// default date = today
const today = new Date();
$('date').value = today.toISOString().split('T')[0];
$('date').min = today.toISOString().split('T')[0];

let chosen = {};

const LUNCH  = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
const DINNER = ['18:00', '18:15', '19:00', '19:30', '20:15', '20:30'];

// services available on a given date
function servicesFor(dateStr) {
  const day = new Date(dateStr + 'T00:00').getDay(); // 0 Sun ... 6 Sat
  const out = [];
  if (day === 0 || day === 6) out.push({ name: 'Lunch', times: LUNCH });
  if ([4, 5, 6, 0].includes(day)) out.push({ name: 'Dinner', times: DINNER }); // Thu–Sun
  return out;
}

function fmtTime(t) {
  let [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, '0')}${ap}`;
}

function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00');
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });
}

$('findBtn').addEventListener('click', () => {
  const party = $('party').value;
  const date = $('date').value;
  if (!date) return;

  chosen = { party, date };
  const services = servicesFor(date);

  results.hidden = false;
  slotsEl.innerHTML = '';
  $('resultLabel').textContent =
    `${fmtDate(date)} · ${party} ${party == 1 ? 'guest' : 'guests'}`;

  if (services.length === 0) {
    noSlots.hidden = false;
    return;
  }
  noSlots.hidden = true;

  services.forEach(svc => {
    const group = document.createElement('div');
    group.className = 'slot-group';
    const label = document.createElement('p');
    label.className = 'slot-group__label';
    label.textContent = svc.name;
    group.appendChild(label);

    const row = document.createElement('div');
    row.className = 'slot-group__row';
    svc.times.forEach(t => {
      const b = document.createElement('button');
      b.className = 'slot';
      b.textContent = fmtTime(t);
      b.addEventListener('click', () => selectSlot(t, svc.name));
      row.appendChild(b);
    });
    group.appendChild(row);
    slotsEl.appendChild(group);
  });

  results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

function selectSlot(t, service) {
  chosen.time = t;
  chosen.service = service;
  $('summary').innerHTML =
    `<strong>${fmtDate(chosen.date)}</strong><span>${fmtTime(t)} · ${service} · ${chosen.party} ${chosen.party == 1 ? 'guest' : 'guests'}</span>`;
  stepSearch.hidden = true;
  stepDetails.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$('backBtn').addEventListener('click', () => {
  stepDetails.hidden = true;
  stepSearch.hidden = false;
});

$('resForm').addEventListener('submit', (e) => {
  e.preventDefault();
  $('confirmDetail').innerHTML =
    `${fmtDate(chosen.date)} at <strong>${fmtTime(chosen.time)}</strong> for ${chosen.party} ${chosen.party == 1 ? 'guest' : 'guests'}.`;
  stepDetails.hidden = true;
  stepConfirm.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
