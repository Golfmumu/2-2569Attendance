// ===================== ตั้งค่าที่ครูต้องแก้ =====================

// 1) คัดลอกค่าจาก Firebase Console > Project settings > Your apps > Web app
export const firebaseConfig = {
  apiKey: "AIzaSyCTg-tfdRdCpJWqDlYotk1ZVcSai5umOgQ",
  authDomain: "attendance-26954.firebaseapp.com",
  projectId: "attendance-26954",
  storageBucket: "attendance-26954.firebasestorage.app",
  messagingSenderId: "729880491208",
  appId: "1:729880491208:web:e66aa1663bbd7637ea21fd",
  measurementId: "G-RRJJ0ZN9T4"
};

// 2) อีเมลบัญชีครู (ต้องตรงกับใน firestore.rules ด้วย)
export const TEACHER_EMAILS = ["preechaya.te@gmail.com"];

// 3) รายวิชา / ห้องที่สอน — แก้ชื่อห้องได้ แต่ห้ามเปลี่ยน id หลังเริ่มใช้งานจริง
export const SECTIONS = [
  { id: "sci3-r1", subject: "วิทยาศาสตร์ 3", room: "ห้อง 2" },
  { id: "sci3-r2", subject: "วิทยาศาสตร์ 3", room: "ห้อง 4" },
  { id: "sci3-r3", subject: "วิทยาศาสตร์ 3", room: "ห้อง 6" },
  { id: "sci3-r4", subject: "วิทยาศาสตร์ 3", room: "ห้อง 8" },
  { id: "daily-r1", subject: "วิทยาศาสตร์เพื่อชีวิตประจำวัน", room: "ห้อง 1" },
  { id: "bio-r1", subject: "ชีวะคือชีวิต", room: "ม.3" },
];

// 4) คะแนน
export const SLOT_COUNT = 10;          // จำนวนช่องคะแนนเก็บ
export const SLOT_MAX = 10;            // คะแนนเต็มต่อช่อง
export const DEFAULT_MIDTERM_MAX = 20; // คะแนนเต็มกลางภาค (แก้ได้ในหน้าครู)

// 5) QR เปลี่ยนรหัสทุกกี่วินาที (กันถ่ายรูป QR ส่งให้เพื่อน)
export const QR_ROTATE_SECONDS = 10;

// นักเรียนล็อกอินด้วยรหัสนักเรียน ระบบจะแปลงเป็นอีเมลภายในแบบนี้ (ไม่ต้องแก้)
export const STUDENT_EMAIL_DOMAIN = "students.classcheck.app";
