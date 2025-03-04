import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { PaginationDto } from 'src/commons/dto/pagination.dto'
import { PropertiesService } from './properties.service'
import { UpdatePropertyDto } from './dto/update-property.dto'
import { CreatePropertyDto } from './dto/create-property.dto'

@Controller( 'properties' )
export class PropertiesController {
    constructor ( private readonly propertiesService: PropertiesService ) { }

    @Post()
    create ( @Body() createPropertyDto: CreatePropertyDto ) {
        return this.propertiesService.create( createPropertyDto )
    }

    @Get()
    findAll ( @Query() paginationDto: PaginationDto ) {
        return this.propertiesService.findAll( paginationDto )
    }

    @Get( ':term' )
    findOne ( @Param( 'term' ) term: string ) {
        return this.propertiesService.findOnePlain( term )
    }

    @Put( ':id' )
    update ( @Param( 'id', ParseUUIDPipe ) id: string, @Body() updatePropertyDto: UpdatePropertyDto ) {
        return this.propertiesService.update( id, updatePropertyDto )
    }

    @Delete( ':id' )
    remove ( @Param( 'id', ParseUUIDPipe ) id: string ) {
        return this.propertiesService.remove( id )
    }
}
