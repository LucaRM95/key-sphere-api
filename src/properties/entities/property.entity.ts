import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropertyImage } from './property-image.entity';
import { User } from "src/users/entities";


@Entity( { name: 'products' } )
export class Property {
    @PrimaryGeneratedColumn( 'uuid' )
    id: string

    @Column( 'text', {
        unique: true
    } )
    title: string

    @Column( {
        type: 'text',
        nullable: true
    } )
    description: string

    @Column( 'text' )
    address: string

    @Column( 'float', {
        default: 0
    } )
    price: number

    @Column( 'text', {
        unique: true
    } )
    slug: string

    @Column( 'float', {
        default: 0
    })
    area: number

    @Column( 'int', {
        default: 0
    })
    rooms: number

    @Column( 'int', {
        default: 0
    })
    beds: number

    @Column( 'int', {
        default: 0
    })
    baths: number

    @Column( 'boolean', { nullable: true, default: true } )
    status: boolean

    @Column( {
        type: 'text',
        array: true,
        default: []
    } )
    tags: string[]

    @OneToMany(
        () => PropertyImage,
        propertyImage => propertyImage.property,
        {
            cascade: true,
            eager: true
        }
    )
    images?: PropertyImage[]

    @ManyToOne(
        () => User,
        (user) => user.properties,
        { eager: true }
    )
    owner: User;

    @BeforeInsert()
    @BeforeUpdate()
    checkSlug () {
        if ( !this.slug )
            this.slug = this.title

        this.slug = this.slug
            .toLowerCase()
            .replaceAll( " ", "_" )
            .replaceAll( "'", '' )
    }
}
