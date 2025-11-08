document.addEventListener('DOMContentLoaded', () => {
    const talks = [
        {
            title: "The Future of Artificial Intelligence",
            speakers: ["Dr. Evelyn Reed"],
            category: ["AI", "Machine Learning", "Future Tech"],
            duration: 60,
            description: "A deep dive into the next generation of AI, exploring neural networks, and the potential impact on society."
        },
        {
            title: "Modern Web Development with WebAssembly",
            speakers: ["Johnathan Carter", "Mia Wong"],
            category: ["Web", "Performance", "JavaScript"],
            duration: 60,
            description: "Discover how WebAssembly is revolutionizing web performance by allowing near-native speed for complex applications."
        },
        {
            title: "Scalable Cloud Architectures",
            speakers: ["Priya Sharma"],
            category: ["Cloud", "DevOps", "Scalability"],
            duration: 60,
            description: "Learn the principles of designing and deploying highly scalable and resilient applications in the cloud."
        },
        {
            title: "Cybersecurity in a Quantum World",
            speakers: ["Ben Sullivan"],
            category: ["Security", "Quantum Computing"],
            duration: 60,
            description: "An exploration of the threats quantum computing poses to current encryption standards and the future of secure communication."
        },
        {
            title: "The Ethics of Code",
            speakers: ["Dr. Alisha Khan", "Kenji Tanaka"],
            category: ["Ethics", "AI", "Development"],
            duration: 60,
            description: "A critical discussion on the ethical responsibilities of software developers in an increasingly automated world."
        },
        {
            title: "Building Real-Time Applications with Go",
            speakers: ["Isabella Rossi"],
            category: ["Backend", "Go", "Real-Time"],
            duration: 60,
            description: "A practical guide to using Go's concurrency features to build fast, reliable, and real-time systems."
        }
    ];

    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('searchInput');

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const renderSchedule = (filteredTalks) => {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

        let talksRendered = 0;

        filteredTalks.forEach((talk, index) => {
            // Find the original index to correctly place breaks
            const originalIndex = talks.findIndex(t => t.title === talk.title);

            if (talksRendered > 0) {
                const breakTime = new Date(currentTime.getTime());
                currentTime.setMinutes(currentTime.getMinutes() + 10); // 10-minute break
                const breakCard = document.createElement('div');
                breakCard.className = 'break-card';
                breakCard.innerHTML = `<strong>${formatTime(breakTime)} - ${formatTime(currentTime)}</strong> &mdash; Coffee Break`;
                scheduleContainer.appendChild(breakCard);
            }
            
            if (originalIndex === 3) { // Lunch break after the 3rd talk
                 const lunchStartTime = new Date(currentTime.getTime());
                 currentTime.setHours(currentTime.getHours() + 1); // 1-hour lunch
                 const lunchCard = document.createElement('div');
                 lunchCard.className = 'break-card';
                 lunchCard.innerHTML = `<strong>${formatTime(lunchStartTime)} - ${formatTime(currentTime)}</strong> &mdash; Lunch Break`;
                 scheduleContainer.appendChild(lunchCard);
            }

            const startTime = new Date(currentTime.getTime());
            currentTime.setMinutes(currentTime.getMinutes() + talk.duration);
            const endTime = new Date(currentTime.getTime());

            const talkCard = document.createElement('div');
            talkCard.className = 'talk-card';

            talkCard.innerHTML = `
                <div class="talk-time">
                    ${formatTime(startTime)} - ${formatTime(endTime)}
                </div>
                <div class="talk-details">
                    <h2>${talk.title}</h2>
                    <div class="talk-speakers">By: ${talk.speakers.join(', ')}</div>
                    <p class="talk-description">${talk.description}</p>
                    <div class="talk-categories">
                        ${talk.category.map(cat => `<span class="talk-category">${cat}</span>`).join('')}
                    </div>
                </div>
            `;
            scheduleContainer.appendChild(talkCard);
            talksRendered++;
        });
        
        if (filteredTalks.length === 0) {
            scheduleContainer.innerHTML = '<p style="text-align: center;">No talks found matching your search criteria.</p>';
        }
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTalks = talks.filter(talk => 
            talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    });

    // Initial render of the full schedule
    renderSchedule(talks);
});
