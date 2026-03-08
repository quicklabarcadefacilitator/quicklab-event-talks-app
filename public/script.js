document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchInput = document.getElementById('searchInput');
  let talksData = [];

  // Fetch talk data from the API
  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talksData = data;
      renderSchedule(talksData);
    });

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talksData.filter(talk =>
      talk.categories.some(category =>
        category.toLowerCase().includes(searchTerm)
      )
    );
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talks) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('1970-01-01T10:00:00');

    talks.forEach((talk, index) => {
      // Add talk
      const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60000);
      addScheduleItem(
        `${formatTime(currentTime)} - ${formatTime(talkEndTime)}`,
        talk.title,
        talk.speakers.join(', '),
        talk.description,
        talk.categories
      );
      currentTime = talkEndTime;

      // Add lunch break after the 3rd talk
      if (index === 2) {
        const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
        addScheduleItem(
          `${formatTime(currentTime)} - ${formatTime(lunchEndTime)}`,
          'Lunch Break',
          null,
          null,
          null,
          true
        );
        currentTime = lunchEndTime;
      }
      // Add transition time
      else if (index < talks.length - 1) {
        currentTime = new Date(currentTime.getTime() + 10 * 60000);
      }
    });
  }

  function addScheduleItem(time, title, speakers, description, categories, isBreak = false) {
    const item = document.createElement('div');
    item.className = `schedule-item ${isBreak ? 'break' : ''}`;

    let content = `<div class="schedule-time">${time}</div>`;
    content += `<h2 class="talk-title">${title}</h2>`;

    if (speakers) {
      content += `<div class="talk-speakers">${speakers}</div>`;
    }

    if (description) {
      content += `<p>${description}</p>`;
    }

    if (categories) {
      content += `<div class="talk-categories">
        ${categories.map(cat => `<span class="category">${cat}</span>`).join('')}
      </div>`;
    }

    item.innerHTML = content;
    scheduleContainer.appendChild(item);
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
