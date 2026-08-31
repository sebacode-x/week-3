const API_BASE = "/api/students";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}

const StudentAPI = {
  getAll() {
    return fetch(API_BASE).then(handleResponse);
  },
  getOne(id) {
    return fetch(`${API_BASE}/${id}`).then(handleResponse);
  },
  create(student) {
    return fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(handleResponse);
  },
  update(id, student) {
    return fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(handleResponse);
  },
  remove(id) {
    return fetch(`${API_BASE}/${id}`, { method: "DELETE" }).then(handleResponse);
  },
};