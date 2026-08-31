document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("editStudentForm");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const messageEl = document.getElementById("formMessage");

  if (!id) {
    if (messageEl) messageEl.textContent = "No student selected to edit.";
    return;
  }

  try {
    const student = await StudentAPI.getOne(id);
    form.fullName.value = student.fullName;
    form.admissionNumber.value = student.admissionNumber;
    form.className.value = student.className;
    form.gender.value = student.gender;
    if (form.age) form.age.value = student.age ?? "";
    if (form.guardianPhone) form.guardianPhone.value = student.guardianPhone ?? "";
  } catch (err) {
    if (messageEl) messageEl.textContent = "Could not load student: " + err.message;
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const student = Object.fromEntries(formData.entries());

    try {
      await StudentAPI.update(id, student);
      if (messageEl) {
        messageEl.textContent = "Student updated successfully!";
        messageEl.style.color = "green";
      }
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