import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { Client } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Gender } from '../common/gender.enum';
import { ContactType } from './enum/contact-type.enum';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Get all clients with filters' })
  @ApiResponse({
    status: 200,
    description: 'Return filtered clients',
    type: [Client],
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'gender', required: false, enum: Gender })
  @ApiQuery({ name: 'contactType', required: false, enum: ContactType })
  @ApiQuery({ name: 'minAge', required: false, type: Number })
  @ApiQuery({ name: 'maxAge', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('gender') gender?: Gender,
    @Query('contactType') contactType?: ContactType,
    @Query('minAge') minAge?: number,
    @Query('maxAge') maxAge?: number,
    @Query('search') search?: string,
  ): Promise<{ data: Client[]; total: number }> {
    return this.clientService.findAll({
      page,
      limit,
      gender,
      contactType,
      ageRange: minAge || maxAge ? { min: minAge, max: maxAge } : undefined,
      search,
    });
  }

  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({
    status: 200,
    description: 'Return found client',
    type: Client,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @ApiOperation({ summary: 'Create new client' })
  @ApiResponse({
    status: 201,
    description: 'Client successfully created',
    type: Client,
  })
  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Update client by id' })
  @ApiResponse({
    status: 200,
    description: 'Client successfully updated',
    type: Client,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }

  @ApiOperation({ summary: 'Delete client by id' })
  @ApiResponse({ status: 200, description: 'Client successfully deleted' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.clientService.remove(id);
  }
}
