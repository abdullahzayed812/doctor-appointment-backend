import { RequestHandler } from "express";

export type WithError<T = {}> = T & { error: string };

export type ExpressHandler<ReqBody = any, ResBody = any, Params = any, Query = any> = RequestHandler<
  Params,
  Partial<WithError<ResBody>>,
  Partial<ReqBody>,
  Query
>;

// Auth
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string; // Optional, since role might not be required
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string; // The JWT token
  user: {
    id: number;
    name: string;
    email: string;
    role: "admin" | "doctor" | "patient"; // Can be customized based on your roles
  };
}

// Doctor
export interface CreateDoctorRequest {
  userId: number;
  specialty: string;
  qualifications: string;
  experience: number;
}
export type CreateDoctorResponse = DoctorResponse;

export type GetAllDoctorsRequest = {};
export type GetAllDoctorsResponse = DoctorResponse[];

export interface GetDoctorByIdRequest {
  id: string;
}
export type GetDoctorByIdResponse = DoctorResponse;

export interface UpdateDoctorRequest {
  specialty?: string;
  qualifications?: string;
  experience?: number;
}
export type UpdateDoctorResponse = DoctorResponse;

export interface DeleteDoctorRequest {
  id: string;
}
export interface DeleteDoctorResponse {
  message: string;
}

export interface DoctorResponse {
  id: number;
  userId: number;
  specialty: string;
  qualifications: string;
  experience: number;
  createdAt: string;
  updatedAt: string;
}

// Appointment
export interface CreateAppointmentRequest {
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}

export interface UpdateAppointmentRequest {
  date?: string;
  time?: string;
  reason?: string;
}

// Availability
export interface CreateAvailabilityRequest {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

// Notification
export interface SendNotificationRequest {
  to: string;
  type: "email" | "sms" | "push";
  message: string;
}

// Medical Record
export interface CreateMedicalRecordRequest {
  patientId: string;
  notes: string;
  prescriptions: string[];
  attachments?: string[];
}

export interface UpdateMedicalRecordRequest {
  notes?: string;
  prescriptions?: string[];
}
