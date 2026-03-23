import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteEditora from "../middlewares/verificar-perfil-gerente-editora";
import ServiçosGerenteEditora from "../serviços/serviços-gerente-editora";
const RotasGerenteEditora = Router();
export default RotasGerenteEditora;
RotasGerenteEditora.post("/", ServiçosGerenteEditora.cadastrarGerenteEditora);
RotasGerenteEditora.patch("/", verificarToken, verificarPerfilGerenteEditora, ServiçosGerenteEditora.atualizarGerenteEditora);
RotasGerenteEditora.get("/:cpf", verificarToken, verificarPerfilGerenteEditora, ServiçosGerenteEditora.buscarGerenteEditora);
