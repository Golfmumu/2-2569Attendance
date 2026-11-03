// เกมการเรียนรู้ — แสดงในแท็บ "เกม" ของหน้านักเรียน
// sections: null = ทุกห้องเห็น หรือใส่ id ห้อง เช่น ["daily-r1","bio-r1"]
// file: ไฟล์เกมในโฟลเดอร์ games/
export const GAMES = [
  {
    id: "nutrient-detective",
    title: "นักสืบโภชนาการ",
    subtitle: "การทดสอบสารอาหาร",
    desc: "สำรวจบ้านของคุณยาย หาอาหาร 10 ชนิดและอุปกรณ์ทดลอง 11 ชิ้น แล้วทดสอบที่ห้องครัวว่าอาหารแต่ละอย่างมีสารอาหารอะไร",
    minutes: 15,
    file: "games/nutrient-detective.html",
    sections: ["daily-r1", "bio-r1"],
  },
];
