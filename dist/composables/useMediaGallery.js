// ==================== COMPOSABLE ====================
export const useMediaGallery = () => {
  // ==================== ELEMENTS ====================
  const dialog = document.querySelector("#media-dialog");
  const stage = document.querySelector("#media-stage");
  const title = document.querySelector("#media-title");
  const source = document.querySelector("#media-source");
  const error = document.querySelector("#media-error");
  const soundNote = document.querySelector("#media-sound-note");
  if (
    !(dialog instanceof HTMLDialogElement) ||
    !(stage instanceof HTMLElement) ||
    !(title instanceof HTMLElement) ||
    !(source instanceof HTMLAnchorElement) ||
    !(error instanceof HTMLElement)
  )
    return;
  /** @type {HTMLElement | null} */
  let trigger = null;

  // ==================== MODAL ACTIONS ====================
  const closeMedia = () => dialog.close();
  const clearMedia = () => {
    stage.querySelector("video")?.pause();
    stage.replaceChildren();
    document.body.classList.remove("dialog-open");
    trigger?.focus({ preventScroll: true });
  };
  dialog.querySelector(".dialog-close")?.addEventListener("click", closeMedia);
  dialog.addEventListener("close", clearMedia);
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      closeMedia();
  });
  document.querySelectorAll("[data-image], [data-video]").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener("click", () => {
      trigger = button;
      const videoUrl = button.dataset.video;
      const imageUrl = button.dataset.image;
      error.hidden = true;
      if (soundNote instanceof HTMLElement)
        soundNote.hidden = !button.dataset.videoSource;
      source.hidden = !button.dataset.videoSource;
      source.href =
        button.dataset.videoSource ||
        "https://www.instagram.com/jardininfantilsenderos/";
      if (videoUrl) {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.controls = true;
        video.playsInline = true;
        video.muted = true;
        video.autoplay = true;
        video.preload = "metadata";
        video.poster = button.dataset.videoPoster || "";
        video.setAttribute(
          "aria-label",
          button.dataset.videoTitle || "Video de Senderos",
        );
        video.addEventListener("error", () => {
          error.hidden = false;
          source.hidden = false;
        });
        stage.replaceChildren(video);
        title.textContent = button.dataset.videoTitle || "La vida en Senderos";
      } else if (imageUrl) {
        const photo = document.createElement("img");
        photo.src = imageUrl;
        photo.alt =
          button.querySelector("img")?.alt ||
          button.dataset.caption ||
          "Fotografía de Senderos";
        stage.replaceChildren(photo);
        title.textContent = button.dataset.caption || "Momentos de Senderos";
      }
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });

  // ==================== GALLERY FILTERS ====================
  const filters = document.querySelectorAll("[data-filter]");
  const moments = document.querySelectorAll("[data-category]");
  const status = document.querySelector("#gallery-status");
  filters.forEach((filter) => {
    if (!(filter instanceof HTMLButtonElement)) return;
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;
      let visibleCount = 0;
      filters.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === filter));
        item.classList.toggle("active", item === filter);
      });
      moments.forEach((moment) => {
        if (!(moment instanceof HTMLElement)) return;
        const visible =
          category === "todos" || moment.dataset.category === category;
        moment.hidden = !visible;
        if (visible) {
          visibleCount += 1;
          moment.classList.add("is-visible");
        }
      });
      document
        .querySelector(".moments-grid")
        ?.classList.toggle("is-filtered", category !== "todos");
      if (status)
        status.textContent = `${visibleCount} ${visibleCount === 1 ? "momento" : "momentos"} en ${filter.textContent?.trim()}.`;
    });
  });
};
