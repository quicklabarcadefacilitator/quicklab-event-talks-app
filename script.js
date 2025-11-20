document.addEventListener('DOMContentLoaded', () => {
  const schedule = document.getElementById('schedule');
  const search = document.getElementById('search');
  let talks = [];

  fetch('talks.json')
    .then(response => response.json())
    .then(data => {
      talks = data;
      displayTalks(talks);
    });

  function displayTalks(talksToDisplay) {
    schedule.innerHTML = '';
    let startTime = 10 * 60; // 10:00 AM in minutes

    talksToDisplay.forEach((talk, index) => {
      const talkElement = document.createElement('div');
      talkElement.classList.add('talk');

      const time = `${Math.floor(startTime / 60)}:${(startTime % 60).toString().padStart(2, '0')}`;
      const endTime = startTime + talk.duration;
      const endTimeStr = `${Math.floor(endTime / 60)}:${(endTime % 60).toString().padStart(2, '0')}`;

      talkElement.innerHTML = `
        <div class="time">${time} - ${endTimeStr}</div>
        <h2>${talk.title}</h2>
        <div class="speakers">${talk.speakers.join(', ')}</div>
        <div class="category">
          ${talk.category.map(cat => `<span>${cat}</span>`).join('')}
        </div>
        <p>${talk.description}</p>
      `;
      schedule.appendChild(talkElement);

      startTime += talk.duration + 10; // Add 10 minute transition

      if (index === 2) { // Add lunch break after the 3rd talk
        const lunchElement = document.createElement('div');
        lunchElement.classList.add('talk');
        const lunchStartTime = endTime + 10;
        const lunchEndTime = lunchStartTime + 60;
        const lunchStartTimeStr = `${Math.floor(lunchStartTime / 60)}:${(lunchStartTime % 60).toString().padStart(2, '0')}`;
        const lunchEndTimeStr = `${Math.floor(lunchEndTime / 60)}:${(lunchEndTime % 60).toString().padStart(2, '0')}`;
        lunchElement.innerHTML = `<div class="time">${lunchStartTimeStr} - ${lunchEndTimeStr}</div><h2>Lunch Break</h2>`;
        schedule.appendChild(lunchElement);
        startTime = lunchEndTime + 10;
      }
    });
  }

  search.addEventListener('input', () => {
    const searchTerm = search.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
      return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
    });
    displayTalks(filteredTalks);
  });
});
