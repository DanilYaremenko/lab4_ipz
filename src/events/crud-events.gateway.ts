import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';

import { SubscribeMessage } from '@nestjs/websockets';
import { Events } from './enums/events.enum';
import { EventsService } from './events.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8001, { transports: ['websocket'] })
export class CrudEventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly log = new Logger(CrudEventsGateway.name);
  constructor(private readonly eventsService: EventsService) {}

  handleConnection(client: any) {
    this.log.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.log.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(Events.dataCreated)
  handleDataCreated() {
    return this.eventsService.subscribe(Events.dataCreated);
  }

  @SubscribeMessage(Events.dataUpdated)
  handleDataUpdated() {
    return this.eventsService.subscribe(Events.dataUpdated);
  }

  @SubscribeMessage(Events.dataDeleted)
  handleDataDeleted() {
    return this.eventsService.subscribe(Events.dataDeleted);
  }
}
