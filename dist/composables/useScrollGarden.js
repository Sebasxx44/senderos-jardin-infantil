// ==================== COMPOSABLE ====================
export const useScrollGarden = () => {
  // ==================== STATE ====================
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.querySelector(".motion-toggle");
  const garden = document.querySelector(".garden-transition");
  let paused = preference.matches;
  let scheduled = false;

  // ==================== ACTIONS ====================
  const updateMotionPreference = () => {
    document.documentElement.classList.toggle("motion-paused", paused);
    if (!(toggle instanceof HTMLButtonElement)) return;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.textContent = paused ? "Activar animaciones" : "Pausar animaciones";
  };
  const updateScroll = () => {
    scheduled = false;
    if (!(garden instanceof HTMLElement) || paused) return;
    const bounds = garden.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(
        1,
        (window.innerHeight - bounds.top) /
          (window.innerHeight + bounds.height),
      ),
    );
    garden.style.setProperty("--garden-progress", String(progress));
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${Math.min(window.scrollY * 0.065, 42)}px`,
    );
  };
  const requestUpdate = () => {
    if (scheduled || paused) return;
    scheduled = true;
    window.requestAnimationFrame(updateScroll);
  };
  toggle?.addEventListener("click", () => {
    paused = !paused;
    updateMotionPreference();
    requestUpdate();
  });
  preference.addEventListener("change", () => {
    paused = preference.matches;
    updateMotionPreference();
    requestUpdate();
  });
  updateMotionPreference();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  requestUpdate();

  // ==================== REVEALS ====================
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((element, index) => {
    if (!(element instanceof HTMLElement)) return;
    element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
    observer.observe(element);
  });
  document.documentElement.classList.add("motion-ready");
};
