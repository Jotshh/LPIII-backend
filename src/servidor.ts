import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import RotasUsuário from "./rotas/rotas-usuário";
import RotasAutor from "./rotas/rotas-autor";
import RotasGerenteEditora from "./rotas/rotas-gerente-editora";

const app = express();
const PORT = process.env.PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN;
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use("/usuarios", RotasUsuário);
app.use("/autores", RotasAutor);
app.listen(PORT || 3333);
app.use("/gerentes-editoras", RotasGerenteEditora);
const conexão = createConnection();
export default conexão;
