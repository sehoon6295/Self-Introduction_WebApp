// Shared nav behavior across all pages.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var current = document.body.getAttribute("data-page");
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("data-page") === current) {
      a.classList.add("active");
    }
  });
})();

// Shared helper: render user-submitted text as plain text, never as HTML.
function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = String(str == null ? "" : str);
  return div.innerHTML;
}
