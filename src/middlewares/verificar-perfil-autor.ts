import { Perfil } from "../entidades/usuário";
export default function verificarPerfilAutor(request, response, next) {
if (request.perfil === Perfil.AUTOR) return next();
else return response.status(401).json({ erro: "Acesso não autorizado." });
};
