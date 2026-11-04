const search = document.querySelector('#search');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.chapter-card');

let selectedChapter = 'all';

function filterLessons() {
  const query = search.value.trim().toLocaleLowerCase();
  let visibleLessons = 0;

  cards.forEach(card => {
    const matchesChapter = selectedChapter === 'all' || card.dataset.chapter === selectedChapter;
    let matches = 0;

    card.querySelectorAll('.lesson-list li').forEach(lesson => {
      const visible = matchesChapter && lesson.textContent.toLocaleLowerCase().includes(query);
      lesson.hidden = !visible;
      if (visible) {
        matches++;
      }
    });

    card.hidden = matches === 0;
    visibleLessons += matches;
  });

  document.querySelector('#empty').hidden = visibleLessons > 0;
  document.querySelector('#result-status').textContent = `${visibleLessons}개의 실습`;
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    selectedChapter = button.dataset.filter;
    filters.forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    filterLessons();
  });
});

search.addEventListener('input', filterLessons);
filterLessons();
