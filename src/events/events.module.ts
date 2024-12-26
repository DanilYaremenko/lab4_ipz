import { Global, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { config } from 'dotenv';
import { CrudEventsGateway } from './crud-events.gateway';
import { EventsController } from './events.controller';

config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    EventsService,
    CrudEventsGateway,
    {
      provide: 'EVENTS_EMITTER',
      useFactory: () =>
        new EventEmitter2({
          wildcard: true,
          delimiter: '.',
          newListener: false,
          removeListener: false,
          maxListeners: 10,
          verboseMemoryLeak: false,
          ignoreErrors: false,
        }),
    },
  ],
  controllers: [EventsController],
  exports: [EventsService],
})
@Global()
export default class EventsModule {}
