
import { AreaModel } from "../models/AreaModel.js";

export const getAreas = async (req, res) => {
  try {
    const areas = await AreaModel.find();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await AreaModel.findById(id);
    if (!area) {
      return res.status(404).json(`Área con ID: ${id} no encontrada`);
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArea = async (req, res) => {
  try {
    const area = await AreaModel.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await AreaModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await AreaModel.findByIdAndDelete(id);
    if (!area) {
      return res.status(404).json(`Área con ID: ${id} no encontrada`);
    }
    res.status(200).json("Área eliminada exitosamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
