import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/index.js';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json())//uso de middleware (Intermediario entre peticiones y lo que se ejecuta) se defina antes para alterar a las rutas por debajo de el 
app.use(urlencoded({extended:true}))//Middleware para formularios metodo POST
app.use("/api", router);//Middleware Para usar el router

/*
app.get("/", (req, res) => {
    res.send("Hola mundo");
})*/
//Llamado a variables de entorno
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        console.log("¡Mongo Connected!");
        app.listen(PORT, () => {
            console.log(`Server running http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();