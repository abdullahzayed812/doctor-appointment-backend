import { IDoctorService } from "../services/DoctorService";
import {
  CreateDoctorRequest,
  CreateDoctorResponse,
  DeleteDoctorRequest,
  DeleteDoctorResponse,
  ExpressHandler,
  GetAllDoctorsRequest,
  GetAllDoctorsResponse,
  GetDoctorByIdRequest,
  GetDoctorByIdResponse,
  UpdateDoctorRequest,
  UpdateDoctorResponse,
} from "../types/apis";

export class DoctorController {
  constructor(private doctorService: IDoctorService) {}

  public createDoctor: ExpressHandler<CreateDoctorRequest, CreateDoctorResponse> = async (req, res) => {
    const { userId, specialty, experience, qualifications } = req.body;

    if (!userId || !specialty || !experience || !qualifications) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    try {
      const doctor = await this.doctorService.createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (err) {
      res.status(500).json({ error: "Doctor creation failed." });
    }
  };

  public getAllDoctors: ExpressHandler<GetAllDoctorsRequest, GetAllDoctorsResponse> = async (_, res) => {
    const doctors = await this.doctorService.getAllDoctors();
    res.status(200).json(doctors);
  };

  public getDoctorById: ExpressHandler<GetDoctorByIdRequest, GetDoctorByIdResponse, { id: string }> = async (
    req,
    res
  ) => {
    const doctor = await this.doctorService.getDoctorById(Number(req.params.id));
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    res.status(200).json(doctor);
  };

  public updateDoctor: ExpressHandler<UpdateDoctorRequest, UpdateDoctorResponse> = async (req, res) => {
    try {
      const updated = await this.doctorService.updateDoctor(Number(req.params.id), req.body);
      res.status(200).json(updated);
    } catch (err) {
      res.status(404).json({ error: "Update failed" });
    }
  };

  public deleteDoctor: ExpressHandler<DeleteDoctorRequest, DeleteDoctorResponse, { id: string }> = async (req, res) => {
    try {
      await this.doctorService.deleteDoctor(Number(req.params.id));
      res.status(200).json({ message: "Doctor deleted" });
    } catch (err) {
      res.status(500).json({ error: "Delete failed" });
    }
  };
}
