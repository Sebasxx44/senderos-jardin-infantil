// ==================== COMPONENT ====================
export const ActionHeaderTA = () => {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");
  if (
    !(toggle instanceof HTMLButtonElement) ||
    !(navigation instanceof HTMLElement)
  )
    return;

  // ==================== ACTIONS ====================
  const closeNavigation = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    toggle.setAttribute(
      "aria-label",
      isExpanded ? "Abrir menú" : "Cerrar menú",
    );
    navigation.classList.toggle("is-open", !isExpanded);
  });
  navigation
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeNavigation));
  document.addEventListener("keydown", (event) => {
    if (
      event.key !== "Escape" ||
      toggle.getAttribute("aria-expanded") !== "true"
    )
      return;
    closeNavigation();
    toggle.focus();
  });
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Node)) return;
    if (!navigation.contains(event.target) && !toggle.contains(event.target))
      closeNavigation();
  });
};
