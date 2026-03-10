import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from
"typeorm";
import GerenteEditora from "./gerenteEditora";
import Livro from "./livro";
@Entity()
export default class Avaliação extends BaseEntity {
@PrimaryGeneratedColumn()
 id: number;
 @Column()
 nota_avaliação: number;
 @Column()
 justificativa: string;
 @CreateDateColumn()
 data_avaliação: Date;
 @ManyToOne(() => Livro, (livro) => livro.avaliações, { onDelete: "CASCADE" })
 livro: Livro;
 @ManyToOne(() => GerenteEditora, (gerenteEditora) => gerenteEditora.avaliações, { onDelete: "CASCADE" })
 gerenteEditora: GerenteEditora;
}
