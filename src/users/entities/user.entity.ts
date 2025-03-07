import { Property } from "src/properties/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn( 'uuid' )
    id: string
    
    @Column('text')
    name: string

    @Column('text')
    lastName: string

    @Column('text', {
        unique: true
    })
    email: string

    @Column('text')
    role: string

    @Column('text')
    password: string

    @Column('int', {
        default: 0
    })
    phone: number

    @Column('int', {
        default: 0
    })
    cellPphone: number

    @OneToMany(
        () => Property,
        (property) => property.owner
    )
    properties: Property[];
}