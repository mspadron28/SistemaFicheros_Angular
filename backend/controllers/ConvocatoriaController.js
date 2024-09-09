
import { ConvocatoriaModel } from "../models/ConvocatoriaModel.js";
import { OrganismoModel } from "../models/OrganismoModel.js";

export const getConvocatorias = async (req, res) => {
  try {
    const convocatorias = await ConvocatoriaModel.find();
    res.status(200).json(convocatorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConvocatoria = async (req, res) => {
  try {
    const { id } = req.params;
    const convocatoria = await ConvocatoriaModel.findById(id);
    if (!convocatoria) {
      return res.status(404).json(`Convocatoria con ID: ${id} no encontrada`);
    }
    res.status(200).json(convocatoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createConvocatoria = async (req, res) => {
  try {
    const convocatoria = await ConvocatoriaModel.create(req.body);
    res.status(201).json(convocatoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConvocatoria = async (req, res) => {
  try {
    const { id } = req.params;
    const convocatoria = await ConvocatoriaModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(convocatoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteConvocatoria = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra la Convocatoria antes de eliminarla
    const convocatoria = await ConvocatoriaModel.findByIdAndDelete(id);

    if (!convocatoria) {
      return res.status(404).json(`Convocatoria con ID: ${id} no encontrada`);
    }

    // Actualiza los documentos Organismo para quitar la referencia a la Convocatoria eliminada
    await OrganismoModel.updateMany(
      { convocatorias: id },
      { $pull: { convocatorias: id } }
    );

    res.status(200).json("Convocatoria eliminada exitosamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};