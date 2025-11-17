const fs = require('fs');

const talks = JSON.parse(fs.readFileSync('talks.json', 'utf-8'));
const template = fs.readFileSync('views/index.html', 'utf-8');
const styles = fs.readFileSync('public/styles.css', 'utf-8');
const script = fs.readFileSync('public/script.js', 'utf-8');

let scheduleHtml = '';
let startTime = new Date();
startTime.setHours(10, 0, 0, 0);

const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

talks.forEach((talk, index) => {
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    scheduleHtml += `
        <div class="talk" data-category="${talk.category.join(', ')}">
            <h3>${talk.title}</h3>
            <p class="meta">
                <strong>Time:</strong> ${formatTime(startTime)} - ${formatTime(endTime)}<br>
                <strong>Speakers:</strong> ${talk.speakers.join(', ')}<br>
                <strong>Category:</strong> ${talk.category.join(', ')}
            </p>
            <p>${talk.description}</p>
        </div>
    `;
    startTime = new Date(endTime.getTime() + 10 * 60 * 1000); // 10 minute break

    if (index === 2) { // Lunch break after the 3rd talk
        const lunchEndTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        scheduleHtml += `
            <div class="break">
                <h3>Lunch Break</h3>
                <p class="meta">${formatTime(startTime)} - ${formatTime(lunchEndTime)}</p>
            </div>
        `;
        startTime = lunchEndTime;
    }
});

const finalHtml = template
    .replace('<!-- Talks will be injected here -->', scheduleHtml)
    .replace('<link rel="stylesheet" href="styles.css">', `<style>${styles}</style>`)
    .replace('<script src="script.js"></script>', `<script>${script}</script>`);

fs.writeFileSync('index.html', finalHtml);

console.log('Website generated successfully!');
