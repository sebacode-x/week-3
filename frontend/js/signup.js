document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const messageEl = document.getElementById("formMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
      messageEl.textContent = error.message;
      messageEl.style.color = "red";
      return;
    }

    messageEl.textContent = "Account created! Redirecting to complete your profile...";
    messageEl.style.color = "green";
    setTimeout(() => {
      window.location.href = "complete-profile.html";
    }, 1000);
  });
});
