// ==================== COMPOSABLE ====================
export const useVisitRequest = () => {
  // ==================== ELEMENTS ====================
  const form = document.querySelector("#visit-form");
  const program = document.querySelector("#program");
  const parentName = document.querySelector("#parent-name");
  const interest = document.querySelector("#interest");
  const status = document.querySelector("#form-status");
  if (
    !(form instanceof HTMLFormElement) ||
    !(program instanceof HTMLSelectElement) ||
    !(parentName instanceof HTMLInputElement) ||
    !(interest instanceof HTMLSelectElement)
  )
    return;

  // ==================== ACTIONS ====================
  document.querySelectorAll("[data-program]").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener("click", () => {
      program.value = button.dataset.program || "";
      document
        .querySelector("#visitanos")
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      parentName.focus({ preventScroll: true });
      if (status)
        status.textContent = `Seleccionaste ${program.value}. Completa tu nombre para conversar con Senderos.`;
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = parentName.value.trim();
    parentName.setCustomValidity(
      name ? "" : "Escribe tu nombre para continuar.",
    );
    if (!form.reportValidity()) return;
    const message = `Hola, Senderos. Soy ${name}. Me interesa ${program.value === "Orientación" ? "recibir orientación sobre la etapa de mi pequeño" : `la etapa ${program.value}`} y quisiera ${interest.value}. ¿Me ayudan con más información?`;
    const url = new URL("https://wa.me/573151799124");
    url.searchParams.set("text", message);
    window.open(url.href, "_blank", "noopener,noreferrer");
    if (status)
      status.textContent =
        "Tu mensaje está preparado en WhatsApp. Puedes revisarlo antes de enviarlo.";
  });
  parentName.addEventListener("input", () => parentName.setCustomValidity(""));
};
