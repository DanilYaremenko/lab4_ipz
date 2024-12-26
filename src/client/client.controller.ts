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
import { ClientService } from './client.service';
import { Client } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Gender } from '../common/gender.enum';
import { ContactType } from './enum/contact-type.enum';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.clientService.remove(id);
  }
}
