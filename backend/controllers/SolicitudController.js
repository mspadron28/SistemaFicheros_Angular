
import { SolicitudModel } from "../models/SolicitudModel.js";

export const getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await SolicitudModel.find();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await SolicitudModel.findById(id);
    if (!solicitud) {
      return res.status(404).json(`Solicitud con ID: ${id} no encontrado`);
    }
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolicitudesInvestigador = async (req, res) => {
  try {
    const investigadorId = req.params.investigadorId;
    const solicitudes = await SolicitudModel.find({ participantes: investigadorId });
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSolicitud = async (req, res) => {
  try {
    const solicitud = await SolicitudModel.create(req.body);
    res.status(201).json(solicitud);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await SolicitudModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await SolicitudModel.findByIdAndDelete(id);
    if (!solicitud) {
      return res.status(404).json(`Solicitud con ID: ${id} no encontrado`);
    }
    res.status(200).json("Solicitud eliminada exitosamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
