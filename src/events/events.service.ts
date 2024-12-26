import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from './enums/events.enum';
import { fromEvent, map } from 'rxjs';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,
    @Inject('EVENTS_EMITTER')
    private readonly emitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async sendMessage(event: Events, data: any) {
    return this.client.emit(event, data);
  }

  handleMessage(event: Events, data: any) {
    return this.emitter.emitAsync(event, data);
  }

  subscribe(event: Events) {
    return fromEvent(this.emitter, event).pipe(
      map((data) => ({ event, data })),
    );
  }
}
