import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import Autor from "../entidades/autor";
import ServiçosUsuário from "./serviços-usuário";
export default class ServiçosAutor {
constructor() {}
static async cadastrarAutor(request, response) {
try {
const { usuário_info, área_atuação, livros_publicados } = request.body;
const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
const entityManager = getManager();
await entityManager.transaction(async (transactionManager) => {
await transactionManager.save(usuário);
const autor = Autor.create({ usuário, área_atuação, livros_publicados });
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
 área_atuação: autor.área_atuação,
 livros_publicados: autor.livros_publicados });
 } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarAutor" }); }
 };

 static async atualizarAutor(request, response) {
try {
const { cpf, área_atuação, livros_publicados } = request.body;
const cpf_encriptado = md5(cpf);
await Autor.update({ usuário: { cpf: cpf_encriptado } },
 { área_atuação, livros_publicados });
return response.json();
 } catch (error) { return response.status(500).json({ erro: "Erro BD : atualizarAutor" }); }
 };
};