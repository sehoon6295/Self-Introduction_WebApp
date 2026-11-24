// Contact form (S04) - front-end validation per the spec.
// createContact() currently mocks the network call; a later week wires this
// to the AppSync createContact mutation -> ContactTable in DynamoDB.

function createContact(payload) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ ok: true });
    }, 500);
  });
}

function validateContactForm(form) {
  var errors = {};
  var name = form.name.value.trim();
  var email = form.email.value.trim();
  var type = form.type.value;
  var message = form.message.value.trim();

  if (name.length < 1 || name.length > 20) {
    errors.name = "이름은 1~20자로 입력해 주세요.";
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!type) {
    errors.type = "문의 유형을 선택해 주세요.";
  }

  if (message.length < 10 || message.length > 500) {
    errors.message = "문의 내용은 10~500자로 입력해 주세요.";
  }

  return errors;
}

function setFieldError(form, field, message) {
  var row = form.querySelector('[data-field="' + field + '"]');
  if (!row) return;
  if (message) {
    row.classList.add("invalid");
    row.querySelector(".form-error").textContent = message;
  } else {
    row.classList.remove("invalid");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var submitBtn = document.getElementById("contact-submit");
  var msgBox = document.getElementById("contact-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var errors = validateContactForm(form);
    ["name", "email", "type", "message"].forEach(function (f) {
      setFieldError(form, f, errors[f]);
    });

    msgBox.className = "form-message";

    if (Object.keys(errors).length > 0) {
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "전송 중...";

    var payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      type: form.type.value,
      budget: form.budget.value.trim(),
      deadline: form.deadline.value.trim(),
      message: form.message.value.trim()
    };

    createContact(payload)
      .then(function () {
        form.reset();
        msgBox.textContent = "문의가 전달되었습니다. 확인 후 이메일로 답변드리겠습니다.";
        msgBox.className = "form-message show success";
      })
      .catch(function () {
        msgBox.textContent = "전송에 실패했습니다. 다시 시도해 주세요.";
        msgBox.className = "form-message show error";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "보내기";
      });
  });
});
