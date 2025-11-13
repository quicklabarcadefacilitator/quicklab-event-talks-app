document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const talkTemplate = document.getElementById('talk-template');
  const searchInput = document.getElementById('search');

  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
      return talk.category.some(category => category.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    talksToRender.forEach((talk, index) => {
      const talkElement = document.importNode(talkTemplate.content, true);

      const startTime = new Date(currentTime);
      const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

      const talkTime = talkElement.querySelector('.talk-time');
      talkTime.textContent = `${formatTime(startTime)} - ${formatTime(endTime)}`;

      const talkTitle = talkElement.querySelector('.talk-title');
      talkTitle.textContent = talk.title;

      const talkSpeakers = talkElement.querySelector('.talk-speakers');
      talkSpeakers.textContent = `By: ${talk.speakers.join(', ')}`;

      const talkCategory = talkElement.querySelector('.talk-category');
      talkCategory.textContent = `Category: ${talk.category.join(', ')}`;

      const talkDescription = talkElement.querySelector('.talk-description');
      talkDescription.textContent = talk.description;

      scheduleContainer.appendChild(talkElement);

      currentTime.setTime(endTime.getTime() + 10 * 60000); // 10 minute break

      if (index === 2) { // Lunch break after the 3rd talk
        const lunchBreakElement = document.createElement('div');
        lunchBreakElement.classList.add('break');
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
        lunchBreakElement.textContent = `Lunch Break: ${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}`;
        scheduleContainer.appendChild(lunchBreakElement);
        currentTime.setTime(lunchEndTime.getTime() + 10 * 60000);
      }
    });
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
