
import { GrupoInvestigacionModel } from "../models/GrupoInvestigacionModel.js";

export const getGruposInvestigacion = async (req, res) => {
  try {
    const gruposInvestigacion = await GrupoInvestigacionModel.find();
    res.status(200).json(gruposInvestigacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGrupoInvestigacion = async (req, res) => {
  try {
    const { id } = req.params;
    const grupoInvestigacion = await GrupoInvestigacionModel.findById(id);
    if (!grupoInvestigacion) {
      return res.status(404).json(`Grupo de Investigación con ID: ${id} no encontrado`);
    }
    res.status(200).json(grupoInvestigacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGrupoInvestigacion = async (req, res) => {
  try {
    const grupoInvestigacion = await GrupoInvestigacionModel.create(req.body);
    res.status(201).json(grupoInvestigacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGrupoInvestigacion = async (req, res) => {
  try {
    const { id } = req.params;
    const grupoInvestigacion = await GrupoInvestigacionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(grupoInvestigacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGrupoInvestigacion = async (req, res) => {
  try {
    const { id } = req.params;
    const grupoInvestigacion = await GrupoInvestigacionModel.findByIdAndDelete(id);
    if (!grupoInvestigacion) {
      return res.status(404).json(`Grupo de Investigación con ID: ${id} no encontrado`);
    }
    res.status(200).json("Grupo de Investigación eliminado exitosamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
