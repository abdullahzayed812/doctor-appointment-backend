import { DoctorModel } from "../models/DoctorModel";
import { IDoctor } from "../types/entities";
import { CreateDoctorRequest, UpdateDoctorRequest } from "../types/apis";

export interface IDoctorService {
  createDoctor(data: CreateDoctorRequest): Promise<IDoctor>;
  getAllDoctors(): Promise<IDoctor[]>;
  getDoctorById(id: number): Promise<IDoctor | null>;
  updateDoctor(id: number, data: UpdateDoctorRequest): Promise<IDoctor>;
  deleteDoctor(id: number): Promise<void>;
}

export class DoctorService implements IDoctorService {
  constructor(private doctorModel: DoctorModel) {}

  async createDoctor(data: CreateDoctorRequest): Promise<IDoctor> {
    const id = await this.doctorModel.createDoctor(data);
    const now = new Date().toISOString();

    return {
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    };
  }

  async getAllDoctors(): Promise<IDoctor[]> {
    return this.doctorModel.getAll();
  }

  async getDoctorById(id: number): Promise<IDoctor | null> {
    return this.doctorModel.findById(id);
  }

  async updateDoctor(id: number, data: UpdateDoctorRequest): Promise<IDoctor> {
    await this.doctorModel.updateDoctor(id, data);
    const updated = await this.doctorModel.findById(id);
    if (!updated) throw new Error("Doctor not found");
    return updated;
  }

  async deleteDoctor(id: number): Promise<void> {
    await this.doctorModel.deleteDoctor(id);
  }
}
