import { RowDataPacket } from "mysql2";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "doctor" | "patient";
  phone?: string;
  avatarUrl?: string;
}

export interface IUser extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor" | "admin";
  created_at: Date;
}

export interface Doctor {
  id: string;
  userId: string;
  specialty: string;
  experience: number;
  qualifications: string;
}

export interface IDoctor extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  qualifications?: string;
  experienceYears?: number;
  bio?: string;
  clinicAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  userId: string;
  age?: number;
  gender?: string;
  contact?: string;
}

export interface Availability {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  isRecurring: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  reason: string;
}

export interface Notification {
  id: string;
  to: string;
  type: "email" | "sms" | "push";
  message: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  notes: string;
  prescriptions: string[];
  attachments?: string[];
}

export interface Payment {
  id: string;
  appointmentId: string;
  method: "card" | "paypal";
  status: "pending" | "completed" | "failed";
}
