import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from
"typeorm";
import Usuário from "./usuário";
import Proposta from "./proposta";
export enum Titulação {MESTRADO = "mestrado", DOUTORADO = "doutorado"};
@Entity()
export default class Autor extends BaseEntity {
@PrimaryGeneratedColumn()
 id: number;
 @Column({ type: "enum", enum: Titulação })
 titulação: Titulação;
 @Column()
 anos_experiência_empresarial: number;
 @OneToMany(() => Proposta, (proposta) => proposta.autor)
 propostas: Proposta[];
 @OneToOne(() => Usuário, (usuário) => usuário.autor, { onDelete: "CASCADE" })
 @JoinColumn()
 usuário: Usuário;
}
