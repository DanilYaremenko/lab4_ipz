import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventsService } from './events.service';
import { Events } from './enums/events.enum';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern(Events.dataCreated)
  handleMessage(data: any) {
    this.eventsService.handleMessage(Events.dataCreated, data);
  }

  @MessagePattern(Events.dataUpdated)
  handleMessageUpdated(data: any) {
    this.eventsService.handleMessage(Events.dataUpdated, data);
  }

  @MessagePattern(Events.dataDeleted)
  handleMessageDeleted(data: any) {
    this.eventsService.handleMessage(Events.dataDeleted, data);
  }
}
