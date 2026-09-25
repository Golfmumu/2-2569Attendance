import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig, TEACHER_EMAILS, SECTIONS, STUDENT_EMAIL_DOMAIN } from "./config.js";

export * from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
export * from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
export * from "./config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];

export function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function isTeacherEmail(email) {
  return !!email && TEACHER_EMAILS.map(e => e.toLowerCase()).includes(email.toLowerCase());
}

export function toEmail(idOrEmail) {
  const v = idOrEmail.trim();
  return v.includes("@") ? v : `${v}@${STUDENT_EMAIL_DOMAIN}`.toLowerCase();
}

export function sectionById(id) { return SECTIONS.find(s => s.id === id); }
export function sectionLabel(id) {
  const s = sectionById(id);
  return s ? `${s.subject} (${s.room})` : id;
}

export function toast(msg, type = "ok") {
  let box = $("#toast");
  if (!box) { box = document.createElement("div"); box.id = "toast"; document.body.appendChild(box); }
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

export function randomToken(len = 12) {
  const a = new Uint8Array(len);
  crypto.getRandomValues(a);
  return [...a].map(b => (b % 36).toString(36)).join("");
}

// รหัสประจำเครื่อง ใช้กันหนึ่งเครื่องเช็คชื่อหลายบัญชีในคาบเดียวกัน
export function deviceId() {
  const KEY = "cc_device_id";
  let id = null;
  try { id = localStorage.getItem(KEY); } catch (e) {}
  if (!id) {
    const m = document.cookie.match(/cc_device_id=([a-z0-9]+)/);
    id = m ? m[1] : randomToken(20);
  }
  try { localStorage.setItem(KEY, id); } catch (e) {}
  document.cookie = `cc_device_id=${id}; max-age=${60 * 60 * 24 * 400}; path=/; SameSite=Lax`;
  return id;
}

export function todayStr(d = new Date()) {
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const TH_MONTH = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
export function thDate(d, withTime = false) {
  if (!d) return "-";
  if (d.toDate) d = d.toDate();
  if (typeof d === "string") d = new Date(d + "T00:00:00");
  let s = `${d.getDate()} ${TH_MONTH[d.getMonth()]} ${d.getFullYear() + 543}`;
  if (withTime) s += ` ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} น.`;
  return s;
}

export function fullName(s) { return `${s.firstName || ""} ${s.lastName || ""}`.trim(); }

export function downloadCSV(filename, rows) {
  const csv = "﻿" + rows.map(r => r.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function thError(e) {
  const c = e?.code || "";
  if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found")) return "รหัสนักเรียน/อีเมล หรือรหัสผ่านไม่ถูกต้อง";
  if (c.includes("email-already-in-use")) return "รหัสนักเรียนนี้สมัครไว้แล้ว ให้เข้าสู่ระบบแทน";
  if (c.includes("weak-password")) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  if (c.includes("invalid-email")) return "รหัสนักเรียนไม่ถูกต้อง (ใช้ตัวเลข/ตัวอักษรอังกฤษเท่านั้น)";
  if (c.includes("permission-denied")) return "ไม่มีสิทธิ์ทำรายการนี้";
  if (c.includes("unavailable") || c.includes("network")) return "เชื่อมต่ออินเทอร์เน็ตไม่ได้";
  return e?.message || "เกิดข้อผิดพลาด";
}
