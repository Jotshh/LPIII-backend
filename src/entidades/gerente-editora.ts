import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn }
 from "typeorm";
import Usuário from "./usuário";
import Avaliação from "./avaliação";
export enum Hierarquia { Se = "Senior", Ju = "Junior" };
@Entity()
export default class GerenteEditora extends BaseEntity {
@PrimaryGeneratedColumn()
 id: number;
 @Column({ type: "enum", enum: Hierarquia })
 cargo: Hierarquia;
 @Column()
 anos_experiência_empresarial: number;
 @Column({ type: "date" })
 data_nascimento: Date;
 @Column()
 telefone: string;
 @OneToMany(() => Avaliação, (avaliação) => avaliação.gerenteEditora)
 avaliações: Avaliação[];
 @OneToOne(() => Usuário, usuário => usuário.gerenteEditora, { onDelete: "CASCADE" })
 @JoinColumn()
 usuário: Usuário;
}