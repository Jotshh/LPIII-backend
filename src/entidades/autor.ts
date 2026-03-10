import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
"typeorm";
import Usuário from "./usuário";
import Livro from "./livro";
export enum ÁreaAtuação {ACADÊMICO = "acadêmico", FICÇÃO_CIENTÍFICA = "ficcão_científica"};
@Entity()
export default class Autor extends BaseEntity {
@PrimaryGeneratedColumn()
 id: number;
 @Column({ type: "enum", enum: ÁreaAtuação })
 área_atuação: ÁreaAtuação;
 @Column()
 livros_publicados: number;
 @OneToMany(() => Livro, (livro) => livro.autor)
 livros: Livro[];
 @OneToOne(() => Usuário, (usuário) => usuário.autor, { onDelete: "CASCADE" })
 @JoinColumn()
 usuário: Usuário;
}
