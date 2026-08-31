document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const messageEl = document.getElementById("formMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      messageEl.textContent = error.message;
      messageEl.style.color = "red";
      return;
    }

    window.location.href = "dashboard.html";
  });
});
