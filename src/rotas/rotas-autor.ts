import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilAutor from "../middlewares/verificar-perfil-autor";
import ServiçosAutor from "../serviços/serviços-autor";
const RotasAutor = Router();
export default RotasAutor;
RotasAutor.post("/", ServiçosAutor.cadastrarAutor);
RotasAutor.get("/:cpf", verificarToken, verificarPerfilAutor,
 ServiçosAutor.buscarAutor);