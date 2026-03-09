import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Interesse from "./interesse";
import Autor from "./autor";
export enum Categoria { EXTENSÃO = "Extensão", IC = "Iniciação Científica", TCC = "TCC" };
export enum Resultado { ARTIGO = "artigo", DESENVOLVIMENTO = "desenvolvimento", MONOGRAFIA =
"monografia" };
@Entity()
export default class Proposta extends BaseEntity {
 @PrimaryGeneratedColumn()
 id: number;
 @Column()
 título: string;
@Column({ type: "enum", enum: Categoria })
 categoria: Categoria;
 @Column()
 área_atuação: string;
 @Column({ type: "date" })
 data_início: Date;
 @Column()
 descrição: string;
 @Column()
 concorrendo_bolsa: boolean;
 @Column({ type: "enum", enum: Resultado })
 resultado: Resultado;
 @ManyToOne(() => Autor, (autor) => autor.propostas, { onDelete: "CASCADE" })
 autor: Autor;
 @OneToMany(() => Interesse, (interesse) => interesse.proposta)
 interesses: Interesse[];
}