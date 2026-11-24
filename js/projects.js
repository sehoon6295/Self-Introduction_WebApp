// Renders the project list (S03) and the detail modal.
// listProjects() / getProject(id) stand in for the future AppSync queries.

function listProjects() {
  return SAMPLE_PROJECTS.slice().sort(function (a, b) {
    return new Date(b.startDate) - new Date(a.startDate);
  });
}

function getProject(id) {
  return SAMPLE_PROJECTS.find(function (p) {
    return p.id === id;
  });
}

function renderProjects() {
  var grid = document.getElementById("project-grid");
  var projects = listProjects();

  if (!projects.length) {
    grid.innerHTML = '<p class="empty-state">아직 등록된 프로젝트가 없습니다.</p>';
    return;
  }

  grid.innerHTML = projects
    .map(function (p) {
      return (
        '<div class="project-card">' +
        '<div class="project-thumb">' + escapeHtml(p.title) + '</div>' +
        '<div class="project-body">' +
        "<h3>" + escapeHtml(p.title) + "</h3>" +
        '<div class="project-period">' + escapeHtml(p.period) + "</div>" +
        '<div class="project-desc">' + escapeHtml(p.result) + "</div>" +
        '<button class="btn btn-secondary" data-id="' + p.id + '">자세히 보기</button>' +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  grid.querySelectorAll("button[data-id]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openProjectModal(btn.getAttribute("data-id"));
    });
  });
}

function openProjectModal(id) {
  var project = getProject(id);
  if (!project) {
    return;
  }

  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-period").textContent = project.period;
  document.getElementById("modal-role").textContent = project.role;
  document.getElementById("modal-tech").textContent = project.tech;
  document.getElementById("modal-result").textContent = project.result;

  var linkEl = document.getElementById("modal-link");
  if (project.link && project.link !== "#") {
    linkEl.href = project.link;
    linkEl.textContent = project.link;
    linkEl.parentElement.style.display = "";
  } else {
    linkEl.parentElement.style.display = "none";
  }

  document.getElementById("project-modal").classList.add("open");
}

function closeProjectModal() {
  document.getElementById("project-modal").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", function () {
  renderProjects();

  document.getElementById("modal-close").addEventListener("click", closeProjectModal);
  document.getElementById("project-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeProjectModal();
    }
  });
});
