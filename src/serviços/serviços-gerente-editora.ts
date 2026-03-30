import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GerenteEditora from '../entidades/gerente-editora';
import ServiçosUsuário from "./serviços-usuário";
export default class ServiçosGerenteEditora {
constructor() {}
static async cadastrarGerenteEditora(request, response) {
try {
const { usuário_info, cargo, anos_experiência_empresarial, data_nascimento, telefone } = request.body;
const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
const entityManager = getManager();
await entityManager.transaction(async (transactionManager) => {
await transactionManager.save(usuário);
const gerenteEditora = GerenteEditora.create({ usuário, cargo, anos_experiência_empresarial, data_nascimento, telefone });
await transactionManager.save(gerenteEditora);
await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
return response.json({ status: Status.ATIVO, token });
 });
 } catch (error) { return console.log("Erro completo:", error);
 }
 };
static async atualizarGerenteEditora(request, response) {
try {
const { cpf, cargo, anos_experiência_empresarial, data_nascimento, telefone } = request.body;
const cpf_encriptado = md5(cpf);
await GerenteEditora.update({ usuário: { cpf: cpf_encriptado } }, { cargo, anos_experiência_empresarial,
 data_nascimento, telefone });
return response.json();
 } catch (error) { return response.status(500).json({ erro: "Erro BD : atualizarGerenteEditora" }); }
 };
static async buscarGerenteEditora(request, response) {
try {
const cpf_encriptado = md5(request.params.cpf);
const gerenteEditora = await GerenteEditora.findOne({ where: { usuário: cpf_encriptado },
 relations: ["usuário"] });
if (!gerenteEditora) return response.status(404).json({ erro: "Gerente Editora não encontrado." });
return response.json({ nome: gerenteEditora.usuário.nome, email: gerenteEditora.usuário.email,
 cargo: gerenteEditora.cargo, anos_experiência_empresarial: gerenteEditora.anos_experiência_empresarial,
 data_nascimento: gerenteEditora.data_nascimento, telefone: gerenteEditora.telefone });
 } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarGerenteEditora" }); }
 };
}