
import { InvestigadorModel } from "../models/InvestigadorModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getInvestigadores = async (req, res) => {
  try {
    const investigadores = await InvestigadorModel.find();
    res.status(200).json(investigadores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvestigador = async (req, res) => {
  try {
    const { id } = req.params;
    const investigador = await InvestigadorModel.findById(id);
    if (!investigador) {
      return res.status(404).json(`Investigador con ID: ${id} no encontrado`);
    }
    res.status(200).json(investigador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInvestigador = async (req, res) => {
  try {
    const { nombre, password, responsable } = req.body;

    // Hash de la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const investigador = await InvestigadorModel.create({
      nombre,
      password: hashedPassword,
      responsable,
    });

    res.status(201).json(investigador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInvestigador = async (req, res) => {
  try {
    const { id } = req.params;
    const investigador = await InvestigadorModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(investigador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInvestigador = async (req, res) => {
  try {
    const { id } = req.params;
    const investigador = await InvestigadorModel.findByIdAndDelete(id);
    if (!investigador) {
      return res.status(404).json(`Investigador con ID: ${id} no encontrado`);
    }
    res.status(200).json("Investigador eliminado exitosamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginInvestigador = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    const investigador = await InvestigadorModel.findOne({ nombre });

    if (!investigador || !bcrypt.compareSync(password, investigador.password)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: investigador._id, role: 'investigador' }, 'your-secret-key');

    const updatedInvestigador = await InvestigadorModel.findOneAndUpdate(
      { _id: investigador._id },
      { token },
      { new: true }
    );

    if (!updatedInvestigador) {
      console.error('Error al actualizar el token en la base de datos');
      return res.status(500).json({ message: 'Error al actualizar el token en la base de datos' });
    }

    console.log('Investigador actualizado en la base de datos:', updatedInvestigador);
    res.status(200).json({ token,investigadorId: investigador._id  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
