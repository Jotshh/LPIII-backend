import { Perfil } from '../entidades/usuário';
export default function verificarPerfilGerenteEditora(request, response, next) {
if (request.perfil === Perfil.GERENTE_EDITORA) return next();
else return response.status(401).json({ erro: "Acesso não autorizado." });
};