document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addStudentForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const student = Object.fromEntries(formData.entries());

    const messageEl = document.getElementById("formMessage");

    try {
      await StudentAPI.create(student);
      if (messageEl) {
        messageEl.textContent = "Student added successfully!";
        messageEl.style.color = "green";
      }
      form.reset();
      setTimeout(() => {
        window.location.href = "index.html";
      }, 800);
    } catch (err) {
      if (messageEl) {
        messageEl.textContent = err.message;
        messageEl.style.color = "red";
      } else {
        alert(err.message);
      }
    }
  });
});