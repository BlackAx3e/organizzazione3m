document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
});

function loadEvents() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const eventContainer = document.getElementById('events-container');
  eventContainer.innerHTML = '';

  events.sort((a, b) => new Date(a.date) - new Date(b.date)); // Ordina gli eventi per data

  events.forEach((event, index) => {
    addEventElement(event.subject, event.type, event.priority, event.date, index);
  });
}

function saveEvent(subject, type, priority, date) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.push({ subject, type, priority, date });
  localStorage.setItem('events', JSON.stringify(events));
}

function removeEvent(index) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.splice(index, 1);
  localStorage.setItem('events', JSON.stringify(events));
  loadEvents(); // Ricarica gli eventi dopo la rimozione
}

function addEvent() {
  const subject = document.getElementById('subject-select').value;
  const type = document.getElementById('type-select').value;
  const priority = document.getElementById('priority-select').value;
  const date = document.getElementById('event-date').value;

  if (!subject || !type || !priority || !date) {
    alert('Per favore, completa tutti i campi.');
    return;
  }

  saveEvent(subject, type, priority, date);
  loadEvents(); // Ricarica gli eventi dopo l'aggiunta
}

function addEventElement(subject, type, priority, date, index) {
  const eventContainer = document.getElementById('events-container');
  const eventElement = document.createElement('div');

  // Converti la data in formato italiano (giorno/mese/anno)
  const formattedDate = new Date(date).toLocaleDateString('it-IT');

  eventElement.classList.add('event');
  eventElement.innerHTML = `
    <div class="event-details">
      <span style="color: ${getColor(priority)}">${subject} - ${type}</span>
      <span>${formattedDate}</span>
    </div>
    <button onclick="removeEvent(${index})">Elimina</button>
  `;

  eventContainer.appendChild(eventElement);
}

function getColor(priority) {
  switch (priority) {
    case 'Alta':
      return 'red';
    case 'Media':
      return 'orange';
    case 'Bassa':
      return 'green';
    default:
      return 'inherit';
  }
}
