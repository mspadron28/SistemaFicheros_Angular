import { TaskModel } from "../models/TaskModel.js" 

export const getTasks = async (req,res) =>{
   try {
      const tasks = await TaskModel.find()
      res.status(200).json(tasks)
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}

export const getTask = async (req,res) =>{
    try {
        const {id} = req.params
        const task = await TaskModel.findById(id)
        if(!task){
            return res.status(404).json(`Tarea con ID: ${id} no encontrado`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const createTask = async (req,res) =>{
    try {
     const task = await TaskModel.create(req.body)
     res.status(201).json(task)
    } catch (error) {
     res.status(500).json({message:error.message})
    }
}

export const updateTask = async (req,res) =>{
    try {
        const {id} = req.params
        const task = await TaskModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true}

        )
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteTask = async (req,res) =>{
    try {
        const {id} = req.params
        const task = await TaskModel.findByIdAndDelete(id)
        if(!task){
            return res.status(404).json(`Tarea con ID: ${id} no encontrado`)
        }
        res.status(200).json("Tarea eliminado exitosamente")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
