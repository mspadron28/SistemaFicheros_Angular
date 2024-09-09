import { SuperAdminModel } from '../models/SuperAdminModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getSuperAdmin = async (req, res) => {
    try {
        const superadmin = await SuperAdminModel.find();
        res.status(200).json(superadmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSuperAdmin = async (req, res) => {
    try {
        const { nombre, password } = req.body;

        // Hash de la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const superadmin = await SuperAdminModel.create({
            nombre,
            password: hashedPassword,
        });

        res.status(201).json(superadmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginSuperAdmin = async (req, res) => {
    try {
        const { nombre, password } = req.body;
        const superadmin = await SuperAdminModel.findOne({ nombre });

        if (!superadmin || !bcrypt.compareSync(password, superadmin.password)) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: superadmin._id, role: 'superadmin' }, 'your-secret-key');

        const updatedSuperAdmin = await SuperAdminModel.findOneAndUpdate(
            { _id: superadmin._id },
            { token },
            { new: true }
        );

        if (!updatedSuperAdmin) {
            console.error('Error al actualizar el token en la base de datos');
            return res.status(500).json({ message: 'Error al actualizar el token en la base de datos' });
        }

        console.log('SuperAdmin actualizado en la base de datos:', updatedSuperAdmin);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};