import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
"typeorm";
import GerenteEditora from "./gerenteEditora";
import Proposta from "./livro";
@Entity()
export default class Interesse extends BaseEntity {
@PrimaryGeneratedColumn()
 id: number;
 @Column()
 nota_avaliação: number;
 @Column()
 justificativa: string;
 @CreateDateColumn()
 data_avaliação: Date;
 @ManyToOne(() => Proposta, (proposta) => proposta.interesses, { onDelete: "CASCADE" })
 proposta: Proposta;
 @ManyToOne(() => GerenteEditora, (gerenteEditora) => gerenteEditora.interesses, { onDelete: "CASCADE" })
 gerenteEditora: GerenteEditora;
}
