import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { ClientFilterOptions } from './dto/client-filter.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async findAll(
    options: ClientFilterOptions = {},
  ): Promise<{ data: Client[]; total: number }> {
    try {
      const {
        page = 1,
        limit = 10,
        gender,
        contactType,
        ageRange,
        search,
      } = options;
      const skip = (page - 1) * limit;

      const filter: any = {};

      if (gender) filter.gender = gender;
      if (contactType) filter.contacts = contactType;
      if (ageRange) {
        filter.age = {};
        if (ageRange.min !== undefined) filter.age.$gte = ageRange.min;
        if (ageRange.max !== undefined) filter.age.$lte = ageRange.max;
      }
      if (search) {
        filter.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { middleName: { $regex: search, $options: 'i' } },
        ];
      }

      const [data, total] = await Promise.all([
        this.clientModel.find(filter).skip(skip).limit(limit).lean().exec(),
        this.clientModel.countDocuments(filter).exec(),
      ]);

      return { data: data as Client[], total };
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch clients: ${error.message}`,
      );
    }
  }

  async findOne(id: string): Promise<Client> {
    try {
      const client = await this.clientModel.findById(id).lean().exec();
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      return client as Client;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Failed to fetch client with ID ${id}`);
    }
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const newClient = new this.clientModel(createClientDto);
      return (await newClient.save()).toObject() as Client;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create client: ${error.message}`,
      );
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    try {
      const client = await this.findOne(id);

      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }

      const updatedClient = await this.clientModel
        .findByIdAndUpdate(id, updateClientDto, { new: true })
        .lean()
        .exec();
      return updatedClient as Client;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to update client with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const client = await this.findOne(id);

      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }

      await this.clientModel.findByIdAndDelete(id).exec();

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to delete client with ID ${id}: ${error.message}`,
      );
    }
  }
}
