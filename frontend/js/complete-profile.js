document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("profileForm");
  const messageEl = document.getElementById("formMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const { error } = await supabaseClient.from("students").insert({
      user_id: user.id,
      full_name: formData.get("fullName"),
      admission_number: formData.get("admissionNumber"),
      class_name: formData.get("className"),
      gender: formData.get("gender"),
      age: formData.get("age") ? Number(formData.get("age")) : null,
      guardian_phone: formData.get("guardianPhone") || null,
    });

    if (error) {
      messageEl.textContent = error.message;
      messageEl.style.color = "red";
      return;
    }

    window.location.href = "dashboard.html";
  });
});
