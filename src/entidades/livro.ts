import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Avaliação from "./avaliação";
import Autor from "./autor";
export enum Gênero { DIDÁTICO = "Didático", ARTIGO = "Artigo", FANTASIA = "Fantasia" };
export enum Tradução { PORTUGUÊS = "Português", INGLÊS = "Inglês", ESPANHOL =
"Espanhol" };
@Entity()
export default class Livro extends BaseEntity {
 @PrimaryGeneratedColumn()
 id: number;
 @Column()
 título: string;
@Column({ type: "enum", enum: Gênero })
 gênero: Gênero;
 @Column({ type: "date" })
 data_publicação: Date;
 @Column()
 descrição: string;
 @Column()
 bestseller: boolean;
 @Column({ type: "enum", enum: Tradução })
 tradução: Tradução;
 @ManyToOne(() => Autor, (autor) => autor.livros, { onDelete: "CASCADE" })
 autor: Autor;
 @OneToMany(() => Avaliação, (avaliação) => avaliação.livro)
 avaliações: Avaliação[];
}