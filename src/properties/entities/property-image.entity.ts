import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Property } from './property.entity'

@Entity( { name: 'product_images' } )
export class PropertyImage {
    @PrimaryGeneratedColumn( 'rowid' )
    id: number

    @Column( 'text' )
    url: string

    @ManyToOne(
        () => Property,
        property => property.images,
        { onDelete: 'CASCADE' }
    )
    property: Property
}