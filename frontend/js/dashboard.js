document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const viewEl = document.getElementById("profileView");

  const { data, error } = await supabaseClient
    .from("students")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    window.location.href = "complete-profile.html";
    return;
  }

  const rows = [
    ["Full Name", data.full_name],
    ["Admission Number", data.admission_number],
    ["Class", data.class_name],
    ["Gender", data.gender],
    ["Age", data.age ?? "-"],
    ["Guardian Phone", data.guardian_phone ?? "-"],
  ];

  viewEl.innerHTML = rows
    .map(([label, value]) => `<li><span class="label">${label}</span><span class="value">${value}</span></li>`)
    .join("");

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
  });
});
