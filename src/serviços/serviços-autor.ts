import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import Autor from "../entidades/autor";
import ServiçosUsuário from "./serviços-usuário";
export default class ServiçosAutor {
constructor() {}
static async cadastrarAutor(request, response) {
try {
const { usuário_info, titulação, anos_experiência_empresarial } = request.body;
const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
const entityManager = getManager();
await entityManager.transaction(async (transactionManager) => {
await transactionManager.save(usuário);
const autor = Autor.create({ usuário, titulação, anos_experiência_empresarial });
await transactionManager.save(autor);
await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
return response.json({ status: Status.ATIVO, token });
 });
 } catch (error) {
return response.status(500).json({ erro: error });
 }
 };
static async buscarAutor(request, response) {
try {
const cpf_encriptado = md5(request.params.cpf);
const autor = await Autor.findOne({ where: { usuário: cpf_encriptado },
relations: ["usuário"] });
if (!autor) return response.status(404).json({ erro: "Autor não encontrado." });
return response.json({ nome: autor.usuário.nome, email: autor.usuário.email,
 titulação: autor.titulação,
 anos_experiência_empresarial: autor.anos_experiência_empresarial });
 } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarAutor" }); }
 };
};