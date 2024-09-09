
import { DepartamentoModel } from "../models/DepartamentoModel.js";

export const getDepartamentos = async (req, res) => {
  try {
    const departamentos = await DepartamentoModel.find();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const departamento = await DepartamentoModel.findById(id);
    if (!departamento) {
      return res.status(404).json(`Departamento con ID: ${id} no encontrado`);
    }
    res.status(200).json(departamento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDepartamento = async (req, res) => {
  try {
    const departamento = await DepartamentoModel.create(req.body);
    res.status(201).json(departamento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const departamento = await DepartamentoModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(departamento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const departamento = await DepartamentoModel.findByIdAndDelete(id);
    if (!departamento) {
      return res.status (404).json(`Departamento con ID: ${id} no encontrado`);
    }
    res.status(200).json("Departamento eliminado exitosamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
