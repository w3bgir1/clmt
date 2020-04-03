window.addEventListener("scroll", () => {
  const active = document.elementFromPoint(100, 100);
  if (active.className.includes("section")) {
    document.querySelector("#navigation").childNodes.forEach(el => {
      if (!el.className) return;
      el.className.includes(active.id)
        ? el.classList.add("active-link")
        : el.classList.remove("active-link");
    });
  }
});
