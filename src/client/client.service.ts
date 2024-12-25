import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { Gender } from '../common/gender.enum';
import { ContactType } from './enum/contact-type.enum';

export interface ClientFilterOptions {
  page?: number;
  limit?: number;
  gender?: Gender;
  contactType?: ContactType;
  ageRange?: {
    min?: number;
    max?: number;
  };
  search?: string;
}

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async findAll(options: ClientFilterOptions = {}): Promise<{ data: Client[]; total: number }> {
    const { page = 1, limit = 10, gender, contactType, ageRange, search } = options;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (gender) {
      filter.gender = gender;
    }

    if (contactType) {
      filter.contacts = contactType;
    }

    if (ageRange) {
      filter.age = {};
      if (ageRange.min !== undefined) {
        filter.age.$gte = ageRange.min;
      }
      if (ageRange.max !== undefined) {
        filter.age.$lte = ageRange.max;
      }
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
  }

  async findOne(id: string): Promise<Client> {
    return this.clientModel.findById(id).lean().exec() as Promise<Client>;
  }

  async create(entity: Partial<Client>): Promise<Client> {
    const newClient = new this.clientModel(entity);
    return (await newClient.save()).toObject() as Client;
  }

  async update(id: string, entity: Partial<Client>): Promise<Client> {
    return this.clientModel
      .findByIdAndUpdate(id, entity, { new: true })
      .lean()
      .exec() as Promise<Client>;
  }

  async remove(id: string): Promise<void> {
    await this.clientModel.findByIdAndDelete(id).exec();
  }
}
