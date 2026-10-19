const express = require('express');
const app = express();

const members = [
  { id: 1, name: 'นายจักรกริช ทองฉาย', role: 'Developer A' },
  { id: 2, name: 'นายฉัตรจิรันตน์ พุมาเกรียว', role: 'Developer B' },
];

const project = {
  team: 'Record team',
  topic: 'ระบบบันทึกข้อมูลการแข่งขันทักษะวิชาชีพ',
  problem: 'ปัญหาที่พบคือการบันทึกข้อมูลการแข่งขันทักษะวิชาชีพยังไม่มีระบบที่สามารถจัดเก็บและเรียกดูข้อมูลได้อย่างมีประสิทธิภาพ',
  users: ['user', 'admin', 'teacher', 'student'],
  members: members,
};

const ideas = [
  { method: GET, path: 'record/student', detail: 'เรียกข้อมูลของนักศึกษา' },
  { method: PUSH, path: 'record/student/Department', detail: 'PUSH ข้อมูลที่แก้ไขของนักศึกษานั้นตามแผนกของบุคคล' },
  { method: GET, path: 'record/student/awards', detail: 'เรียกข้อมูลรางวัลของบุคคล' },
];

app.get('/hello', (req, res) => {
  res.json({ message: 'สวัสดี Back-End!' });
});

app.get('/project', (req, res) => {
  res.json(project);
});

app.get('/members/:id', (req, res) => {
  const id = Number(req.params.id);
  const member = members.find((m) => m.id === id);
  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }
  res.json(member);
});

app.get('/ideas', (req, res) => {
  res.json(ideas);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});