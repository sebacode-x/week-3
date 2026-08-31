document.addEventListener("DOMContentLoaded", loadStudents);

async function loadStudents() {
  const tbody = document.getElementById("studentsTableBody");
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="7">Loading students...</td></tr>`;

  try {
    const students = await StudentAPI.getAll();

    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">No students found. Add one to get started.</td></tr>`;
      return;
    }

    tbody.innerHTML = students.map(rowTemplate).join("");

    tbody.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteStudent(btn.dataset.id));
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7">Error loading students: ${err.message}</td></tr>`;
  }
}

function rowTemplate(s) {
  return `
    <tr>
      <td>${s.id}</td>
      <td>${s.fullName}</td>
      <td>${s.admissionNumber}</td>
      <td>${s.className}</td>
      <td>${s.gender}</td>
      <td>${s.age ?? ""}</td>
      <td>
        <a href="edit-student.html?id=${s.id}">Edit</a>
        <button class="delete-btn" data-id="${s.id}">Delete</button>
      </td>
    </tr>
  `;
}

async function deleteStudent(id) {
  const confirmed = confirm("Are you sure you want to delete this student?");
  if (!confirmed) return;

  try {
    await StudentAPI.remove(id);
    loadStudents();
  } catch (err) {
    alert("Could not delete student: " + err.message);
  }
}