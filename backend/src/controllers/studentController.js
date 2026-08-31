import supabase from "../db/supabaseClient.js";

function toApi(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    admissionNumber: row.admission_number,
    className: row.class_name,
    gender: row.gender,
    age: row.age,
    guardianPhone: row.guardian_phone,
  };
}

function toDb(body) {
  return {
    full_name: body.fullName,
    admission_number: body.admissionNumber,
    class_name: body.className,
    gender: body.gender,
    age: body.age ? Number(body.age) : null,
    guardian_phone: body.guardianPhone || null,
  };
}

export async function getAll(req, res) {
  const { data, error } = await supabase.from("students").select("*").order("created_at");
  if (error) return res.status(500).json({ message: error.message });
  res.json(data.map(toApi));
}

export async function getOne(req, res) {
  const { data, error } = await supabase.from("students").select("*").eq("id", req.params.id).single();
  if (error) return res.status(404).json({ message: "Student not found" });
  res.json(toApi(data));
}

export async function create(req, res) {
  const { data, error } = await supabase.from("students").insert(toDb(req.body)).select().single();
  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(toApi(data));
}

export async function update(req, res) {
  const { data, error } = await supabase
    .from("students")
    .update(toDb(req.body))
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) return res.status(400).json({ message: error.message });
  res.json(toApi(data));
}

export async function remove(req, res) {
  const { error } = await supabase.from("students").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ message: error.message });
  res.status(204).send();
}
