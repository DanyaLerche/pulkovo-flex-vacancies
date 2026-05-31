const detailElement = document.querySelector("[data-vacancy-detail]");
const params = new URLSearchParams(window.location.search);
const vacancyId = params.get("id");
const vacancy = window.pulkovoVacancies.find((item) => String(item.id) === vacancyId);

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function formatTextField(value) {
  return value || "—";
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function renderVacancyDetail() {
  if (!vacancy) {
    detailElement.innerHTML = `
      <article class="detail-card detail-card-empty">
        <span class="status-pill">Не найдена</span>
        <h1>Вакансия не найдена</h1>
        <p class="detail-lead">Вернитесь к списку вакансий и выберите карточку заново.</p>
        <a class="detail-primary-action" href="./index.html">К вакансиям</a>
      </article>
    `;
    return;
  }

  document.title = `Pulkovo Flex | ${vacancy.title}`;
  const createdDate = formatDate(vacancy.createdAt);
  detailElement.innerHTML = `
    <article class="detail-card detail-card-site">
      <div class="detail-copy">
        <span class="status-pill">Открыта</span>
        <h1>${vacancy.title}</h1>
        <div class="detail-divider"></div>

        <section class="detail-section">
          <h2>Описание</h2>
          <p>${formatTextField(vacancy.description)}</p>
        </section>

        <section class="detail-section">
          <h2>Условия</h2>
          <p>${formatTextField(vacancy.details)}</p>
        </section>

        <button class="detail-primary-action" type="button" data-apply-target="${vacancy.id}">
          Откликнуться
        </button>

        ${createdDate ? `<time class="detail-date" datetime="${vacancy.createdAt}">${createdDate}</time>` : ""}
      </div>

      <figure class="detail-figure">
        <img src="${window.defaultVacancyImage}" alt="Дайджест вакансий Pulkovo Flex" />
      </figure>
    </article>
  `;
}

renderVacancyDetail();
setupGlobalActions();
