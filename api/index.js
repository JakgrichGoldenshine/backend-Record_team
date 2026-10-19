const express = require("express");
const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "สวัดดี Back-End!" });
});

const members = [
  { id: 1, name: "นายจักรกริช ทองฉาย", role: "Developer A" },
  { id: 2, name: "นายฉัตรจิรันตน์ พุมาเกรียว", role: "Developer B" },
];

const project = {
  team: "Record team",
  topic: "ระบบบันทึกข้อมูลการแข่งขันทักษะวิชาชีพ",
  problem:
    "ปัญหาที่พบคือการบันทึกข้อมูลการแข่งขันทักษะวิชาชีพยังไม่มีระบบที่สามารถจัดเก็บและเรียกดูข้อมูลได้อย่างมีประสิทธิภาพ",
  users: ["user", "admin", "teacher"],
  members: members,
};

app.get("/project", (req, res) => {
  res.json(project);
});

app.get("/members/:id", (req, res) => {
  const id = Number(req.params.id); // /members/2 ได้ id = 2
  const member = members.find((m) => m.id === id); // หาสมาชิกที่ id ตรงกัน
  if (!member) {
    // ถ้าหาไม่พบ
    return res.status(404).json({ message: "Member not found" });
  }
  res.json(member);
});

const ideas = [
  { method: "GET", path: "record/student", detail: "เรียกข้อมูลนักเรียน" },
  {
    method: "GET",
    path: "record/student/Department",
    detail: "เรียกข้อมูลแผนก",
  },
  { method: "GET", path: "record/student/awards", detail: "เรียกข้อมูลรางวัล" },
];

app.get("/ideas", (req, res) => {
  res.json(ideas);
});

// ข้อมูลตั้งต้นของ resource หลัก (เก็บในหน่วยความจำ)
let students = [
  {
    id: 1,
    name: "นายเอ",
    major: "Information Technology",
    level: "ปวช.3/3",
    awards: ["รางวัลที่ 1", "รางวัลที่ 2"],
  },
  {
    id: 2,
    name: "นางสาวเอม",
    major: "Electronic Engineering",
    level: "ปวส.4/4",
    awards: ["รางวัลที่ 3"],
  },
];
let nextId = 3;

// R: ดู level ทั้งหมด
app.get("/students", (req, res) => {
  const { level } = req.query;
  if (level) {
    return res.json(students.filter((s) => s.level === level));
  }
  res.json(students);
});

// R: ดู 1 รายการ
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "ไม่พบรายการนักเรียน" });
  }
  res.json(student);
});

// C: เพิ่ม
app.post('/students', (req, res) => {
  const { name, major, level } = req.body;
  if (!name || !major || !level) {
    return res.status(400).json({ message: 'ต้องส่ง name, major, และ level' });
  }
  const student = { id: nextId++, name, major, level, awards: [] };
  students.push(student);
  res.status(201).json(student);
});

// U: แก้ไข
app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: 'ไม่พบรายการนักเรียน' });
  }
  const allowed = ['pending', 'inspecting', 'verified'];
  if (req.body.status && !allowed.includes(req.body.status)) {
    return res.status(400).json({ message: 'status ต้องเป็น pending, inspecting, verified' });
  }
  student.name = req.body.name ?? student.name;
  student.major = req.body.major ?? student.major;
  student.level = req.body.level ?? student.level;
  res.json(student);
});

// D: ลบ
app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบรายการนักเรียน' });
  }
  students.splice(index, 1);
  res.status(204).send();
});
 
// ไม่ตรงกับ route ใดเลย
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


