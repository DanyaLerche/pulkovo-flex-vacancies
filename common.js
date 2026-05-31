function getResumeText(vacancy) {
  return vacancy.resumeOptional ? "Отклик без резюме" : "Резюме обязательно";
}

function getCtaText(vacancy) {
  return vacancy.resumeOptional ? "Хочу работать" : "Откликнуться";
}

function goTo(url) {
  window.location.href = url;
}

function setupGlobalActions() {
  const overlay = document.querySelector("[data-menu-overlay]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const closeButtons = document.querySelectorAll("[data-menu-close]");
  const authButtons = document.querySelectorAll("[data-auth-target]");
  const profileButtons = document.querySelectorAll("[data-profile-target]");
  const localVacanciesButtons = document.querySelectorAll("[data-local-vacancies]");
  const logoutButtons = document.querySelectorAll("[data-logout-target]");
  ensureApplyModal();

  if (toggle && overlay) {
    toggle.addEventListener("click", () => {
      if (overlay.classList.contains("is-open")) {
        closeMenu(overlay, toggle);
      } else {
        openMenu(overlay, toggle);
      }
    });
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => closeMenu(overlay, toggle));
  });

  authButtons.forEach((button) => {
    button.addEventListener("click", () => {
      goTo(`${window.pulkovoSiteUrl}/${button.dataset.authTarget}`);
    });
  });

  profileButtons.forEach((button) => {
    button.addEventListener("click", () => goTo("./profile.html"));
  });

  localVacanciesButtons.forEach((button) => {
    button.addEventListener("click", () => goTo("./index.html"));
  });

  logoutButtons.forEach((button) => {
    button.addEventListener("click", () => goTo("./index.html"));
  });

  document.addEventListener("click", (event) => {
    const applyButton = event.target.closest("[data-apply-target]");

    if (applyButton) {
      event.preventDefault();
      event.stopPropagation();
      openApplyModal(applyButton.dataset.applyTarget);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay?.classList.contains("is-open")) {
      closeMenu(overlay, toggle);
    }

    if (event.key === "Escape" && document.body.classList.contains("modal-open")) {
      closeApplyModal();
    }
  });
}

function openMenu(overlay, toggle) {
  overlay.hidden = false;
  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
  });
}

function closeMenu(overlay, toggle) {
  if (!overlay || !toggle) {
    return;
  }

  overlay.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Открыть меню");

  window.setTimeout(() => {
    if (!overlay.classList.contains("is-open")) {
      overlay.hidden = true;
    }
  }, 240);
}

function ensureApplyModal() {
  if (document.querySelector("[data-apply-modal]")) {
    return;
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="apply-modal" data-apply-modal hidden>
        <div class="apply-modal-backdrop" data-apply-close></div>
        <form class="apply-dialog" data-apply-form>
          <h2 data-apply-title></h2>
          <label class="apply-field">
            <span>Комментарий (необязательно)</span>
            <textarea
              name="comment"
              rows="4"
              placeholder="Напишите пару слов работодателю..."
            ></textarea>
          </label>
          <div class="apply-actions">
            <button class="apply-cancel" type="button" data-apply-close>
              Отмена
            </button>
            <button class="apply-submit" type="submit">Отправить отклик</button>
          </div>
        </form>
      </div>
    `,
  );

  document.querySelectorAll("[data-apply-close]").forEach((button) => {
    button.addEventListener("click", closeApplyModal);
  });

  document.querySelector("[data-apply-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    closeApplyModal();
  });
}

function openApplyModal(vacancyId) {
  const vacancy = window.pulkovoVacancies.find((item) => item.id === vacancyId);
  const modal = document.querySelector("[data-apply-modal]");
  const title = document.querySelector("[data-apply-title]");
  const textarea = modal.querySelector("textarea");

  title.textContent = vacancy ? `Отклик на «${vacancy.title}»` : "Отклик на вакансию";
  textarea.value = "";
  modal.hidden = false;

  requestAnimationFrame(() => {
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  });
}

function closeApplyModal() {
  const modal = document.querySelector("[data-apply-modal]");

  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    if (!modal.classList.contains("is-open")) {
      modal.hidden = true;
    }
  }, 220);
}
