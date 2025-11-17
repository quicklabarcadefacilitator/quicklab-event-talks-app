document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const talks = document.querySelectorAll('.talk');

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        talks.forEach(talk => {
            const category = talk.dataset.category.toLowerCase();
            if (category.includes(searchTerm)) {
                talk.style.display = 'block';
            } else {
                talk.style.display = 'none';
            }
        });
    });
});
