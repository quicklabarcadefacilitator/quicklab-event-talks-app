
document.addEventListener('DOMContentLoaded', () => {
    const scheduleElement = document.getElementById('schedule');
    const searchInput = document.getElementById('search');

    let talks = [];

    const renderSchedule = (filteredTalks) => {
        scheduleElement.innerHTML = '';
        filteredTalks.forEach(talk => {
            const talkElement = document.createElement('li');
            talkElement.className = 'talk';
            if (talk.isBreak) {
                talkElement.innerHTML = `
                    <div class="talk-time">${talk.startTime} - ${talk.endTime}</div>
                    <div class="talk-title">${talk.title}</div>
                `;
            } else {
                talkElement.innerHTML = `
                    <div class="talk-time">${talk.startTime} - ${talk.endTime}</div>
                    <div class="talk-title">${talk.title}</div>
                    <div class="talk-speakers">By: ${talk.speakers.join(', ')}</div>
                    <div class="talk-description">${talk.description}</div>
                    <div class="talk-categories">
                        ${talk.categories.map(c => `<span class="talk-category">${c}</span>`).join('')}
                    </div>
                `;
            }
            scheduleElement.appendChild(talkElement);
        });
    };

    const filterTalks = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTalks = talks.filter(talk => {
            if (talk.isBreak) {
                return true;
            }
            return talk.categories.some(c => c.toLowerCase().includes(searchTerm));
        });
        renderSchedule(filteredTalks);
    };

    fetch('schedule.json')
        .then(response => response.json())
        .then(data => {
            talks = data;
            renderSchedule(talks);
            searchInput.addEventListener('input', filterTalks);
        });
});
