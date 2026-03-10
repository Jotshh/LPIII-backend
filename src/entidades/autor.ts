import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
"typeorm";
import Usuário from "./usuário";
import Proposta from "./livro";
export enum ÁreaAtuação {ACADÊMICO = "acadêmico", FICÇÃO_CIENTÍFICA = "ficcão_científica"};
@Entity()
export default class Autor extends BaseEntity {
@PrimaryGeneratedColumn()
 id: number;
 @Column({ type: "enum", enum: ÁreaAtuação })
 área_atuação: ÁreaAtuação;
 @Column()
 livros_publicados: number;
 @OneToMany(() => Proposta, (proposta) => proposta.autor)
 propostas: Proposta[];
 @OneToOne(() => Usuário, (usuário) => usuário.autor, { onDelete: "CASCADE" })
 @JoinColumn()
 usuário: Usuário;
}
