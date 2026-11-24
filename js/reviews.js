// Reviews page (S05): write form with one-time invite code, and paginated list.
// createReview() / listReviews() currently mock InviteTable + ReviewTable (DynamoDB).
// A later week wires these to the AppSync createReview / listReviews operations.

var PAGE_SIZE = 10;
var reviewsState = {
  all: [],
  shown: 0
};

function listReviewsPage() {
  var sorted = reviewsState.all.slice().sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  reviewsState.shown = Math.min(reviewsState.shown + PAGE_SIZE, sorted.length);
  return {
    items: sorted.slice(0, reviewsState.shown),
    hasMore: reviewsState.shown < sorted.length
  };
}

function createReview(code, name, message) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var used = JSON.parse(sessionStorage.getItem("usedInviteCodes") || "[]");
      var validCode = SAMPLE_INVITE_CODES.indexOf(code) !== -1 && used.indexOf(code) === -1;

      if (!validCode) {
        reject(new Error("invalid-code"));
        return;
      }

      used.push(code);
      sessionStorage.setItem("usedInviteCodes", JSON.stringify(used));

      reviewsState.all.unshift({
        name: name,
        message: message,
        createdAt: new Date().toISOString()
      });

      resolve({ ok: true });
    }, 400);
  });
}

function formatDate(iso) {
  var d = new Date(iso);
  return d.getFullYear() + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0");
}

function renderReviewList() {
  var listEl = document.getElementById("review-list");
  var loadMoreWrap = document.getElementById("load-more-wrap");
  reviewsState.shown = 0;
  var page = listReviewsPage();

  if (!page.items.length) {
    listEl.innerHTML = '<p class="empty-state">첫 번째 후기를 남겨 주세요.</p>';
    loadMoreWrap.style.display = "none";
    return;
  }

  listEl.innerHTML = page.items
    .map(function (r) {
      return (
        '<div class="review-item">' +
        '<div class="review-head">' +
        '<span class="review-name">' + escapeHtml(r.name) + "</span>" +
        '<span class="review-date">' + formatDate(r.createdAt) + "</span>" +
        "</div>" +
        '<div class="review-message">' + escapeHtml(r.message) + "</div>" +
        "</div>"
      );
    })
    .join("");

  loadMoreWrap.style.display = page.hasMore ? "" : "none";
}

function appendReviewPage() {
  var listEl = document.getElementById("review-list");
  var loadMoreWrap = document.getElementById("load-more-wrap");
  var prevShown = reviewsState.shown;
  var page = listReviewsPage();
  var newItems = page.items.slice(prevShown);

  newItems.forEach(function (r) {
    var div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML =
      '<div class="review-head">' +
      '<span class="review-name">' + escapeHtml(r.name) + "</span>" +
      '<span class="review-date">' + formatDate(r.createdAt) + "</span>" +
      "</div>" +
      '<div class="review-message">' + escapeHtml(r.message) + "</div>";
    listEl.appendChild(div);
  });

  loadMoreWrap.style.display = page.hasMore ? "" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
  reviewsState.all = SAMPLE_REVIEWS.slice();
  renderReviewList();

  document.getElementById("load-more-btn").addEventListener("click", appendReviewPage);

  var form = document.getElementById("review-form");
  var submitBtn = document.getElementById("review-submit");
  var msgBox = document.getElementById("review-message-box");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var code = form.code.value.trim();
    var name = form.name.value.trim();
    var message = form.message.value.trim();

    var errors = {};
    if (!code) errors.code = "초대 코드를 입력해 주세요.";
    if (name.length < 1 || name.length > 20) errors.name = "이름은 1~20자로 입력해 주세요.";
    if (message.trim().length < 1 || message.length > 200) errors.message = "메시지는 1~200자로 입력해 주세요.";

    ["code", "name", "message"].forEach(function (f) {
      var row = form.querySelector('[data-field="' + f + '"]');
      if (errors[f]) {
        row.classList.add("invalid");
        row.querySelector(".form-error").textContent = errors[f];
      } else {
        row.classList.remove("invalid");
      }
    });

    msgBox.className = "form-message";
    if (Object.keys(errors).length > 0) {
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "등록 중...";

    createReview(code, name, message)
      .then(function () {
        form.reset();
        msgBox.textContent = "후기가 등록되었습니다. 감사합니다!";
        msgBox.className = "form-message show success";
        renderReviewList();
      })
      .catch(function () {
        msgBox.textContent = "유효하지 않은 초대 코드입니다.";
        msgBox.className = "form-message show error";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "남기기";
      });
  });
});
