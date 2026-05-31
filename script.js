const listElement = document.querySelector("[data-vacancy-list]");
const countElement = document.querySelector("[data-vacancy-count]");

function renderVacancies() {
  countElement.textContent = `${window.pulkovoVacancies.length} открытых`;
  listElement.innerHTML = window.pulkovoVacancies
    .map(
      (vacancy) => `
        <article
          class="vacancy-card vacancy-card-link"
          data-detail-url="./vacancy.html?id=${encodeURIComponent(vacancy.id)}"
          role="link"
          tabindex="0"
        >
          <span class="status-pill">Открыта</span>
          <h2 class="vacancy-title">${vacancy.title}</h2>
          <div class="vacancy-info">
            <span>${getResumeText(vacancy)}</span>
            <span class="vacancy-details">${vacancy.details}</span>
          </div>
          <button
            class="vacancy-apply"
            type="button"
            data-apply-target="${vacancy.id}"
          >
            ${getCtaText(vacancy)}
          </button>
        </article>
      `,
    )
    .join("");
}

setupGlobalActions();
renderVacancies();

listElement.addEventListener("click", (event) => {
  if (event.target.closest("[data-apply-target]")) {
    return;
  }

  const card = event.target.closest("[data-detail-url]");

  if (card) {
    goTo(card.dataset.detailUrl);
  }
});

listElement.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  const card = event.target.closest("[data-detail-url]");

  if (card && event.target === card) {
    event.preventDefault();
    goTo(card.dataset.detailUrl);
  }
});
