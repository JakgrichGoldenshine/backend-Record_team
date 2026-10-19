const express=require('express');
const app=express();

app.get('/hello',(req, res)=>{
    res.json({ message: 'สวัดดี Back-End!' });
});

const members = [
  { id: 1, name: 'นายจักรกริช ทองฉาย', role: 'Developer A' },
  { id: 2, name: 'นายฉัตรจิรันตน์ พุมาเกรียว', role: 'Developer B' },
];

const project = {
  team: 'Record team',
  topic: 'ระบบบันทึกข้อมูลการแข่งขันทักษะวิชาชีพ',
  problem: 'ปัญหาที่พบคือการบันทึกข้อมูลการแข่งขันทักษะวิชาชีพยังไม่มีระบบที่สามารถจัดเก็บและเรียกดูข้อมูลได้อย่างมีประสิทธิภาพ',
  users: ['user', 'admin', 'teacher'],
  members: members,
};

app.get('/project', (req, res) => {
  res.json(project);
});

app.get('/members/:id', (req, res) => {
  const id = Number(req.params.id);                  // /members/2 ได้ id = 2
  const member = members.find((m) => m.id === id);    // หาสมาชิกที่ id ตรงกัน
  if (!member) {                                      // ถ้าหาไม่พบ
    return res.status(404).json({ message: 'Member not found' });
  }
  res.json(member);
});

const ideas = [
  { method: 'GET', path: 'record/student', detail: 'เรียกข้อมูลนักเรียน' },
  { method: 'GET', path: 'record/student/Department', detail: 'เรียกข้อมูลแผนก' },
  { method: 'GET', path: 'record/student/awards', detail: 'เรียกข้อมูลรางวัล' },
];

app.get('/ideas', (req, res) => {
  res.json(ideas);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
