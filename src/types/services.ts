import {
  CreateAppointmentRequest,
  CreateAvailabilityRequest,
  CreateMedicalRecordRequest,
  LoginResponse,
  SendNotificationRequest,
  UpdateAppointmentRequest,
  UpdateMedicalRecordRequest,
} from "./apis";
import { Appointment, Availability, Doctor, IUser, MedicalRecord, Patient, User } from "./entities";

export interface IUserService {
  getProfile(userId: string): Promise<User>;
  updateProfile(userId: string, updates: Partial<User>): Promise<User>;
}

export interface IPatientService {
  getPatientByUserId(userId: string): Promise<Patient>;
  updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient>;
}

export interface IAppointmentService {
  createAppointment(data: CreateAppointmentRequest, patientId: string): Promise<Appointment>;
  getAppointmentsForUser(userId: string, role: string): Promise<Appointment[]>;
  updateAppointment(id: string, data: UpdateAppointmentRequest): Promise<Appointment>;
  deleteAppointment(id: string): Promise<void>;
}

export interface IAvailabilityService {
  createAvailability(doctorId: string, data: CreateAvailabilityRequest): Promise<Availability>;
  getAvailabilityForDoctor(doctorId: string): Promise<Availability[]>;
  deleteAvailability(id: string): Promise<void>;
}

export interface INotificationService {
  sendNotification(data: SendNotificationRequest): Promise<void>;
}

export interface IMedicalRecordService {
  createRecord(data: CreateMedicalRecordRequest, doctorId: string): Promise<MedicalRecord>;
  getRecordsForPatient(patientId: string): Promise<MedicalRecord[]>;
  updateRecord(id: string, updates: UpdateMedicalRecordRequest): Promise<MedicalRecord>;
}
